import os
import sys
import json
import pickle

os.environ['PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION'] = 'python'

# Based on Harvestify implementation
fertilizer_dic = {
    'NHigh': """The N value of soil is high and might give rise to weeds. 1. Manure – adding manure is one of the simplest ways to amend your soil with nitrogen. 2. Coffee grinds – rich in nitrogen, improves drainage. 3. Plant nitrogen-fixing plants like peas or beans.""",
    'Nlow': """The N value of your soil is low. 1. Add sawdust or fine woodchips to help absorb nitrogen. 2. Plant heavy nitrogen feeders like tomatoes or corn. 3. Use NPK fertilizers with high N value.""",
    'PHigh': """The P value of your soil is high. 1. Avoid adding manure. 2. Use phosphorus-free fertilizer (e.g., 10-0-10). 3. Water soil liberally to drive phosphorus out.""",
    'Plow': """The P value of your soil is low. 1. Use bone meal for fast action. 2. Rock phosphate for slower release. 3. High phosphorus NPK fertilizer.""",
    'KHigh': """The K value of your soil is high. 1. Loosen soil and water thoroughly. 2. Stop applying potassium-rich fertilizer. 3. Add crushed eggshells or seashells to balance.""",
    'Klow': """The K value of your soil is low. 1. Mix in muriate of potash. 2. Try kelp meal or seaweed. 3. Bury banana peels under the soil surface."""
}

def recommend_crop(n, p, k, temp, humidity, ph, rainfall):
    import numpy as np
    import pandas as pd
    working_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(working_dir, "RandomForest.pkl")
    csv_path = os.path.join(working_dir, "data", "fertilizer.csv")
    
    # 1. Try real model first
    if os.path.exists(model_path):
        try:
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            if not (isinstance(model, dict) and model.get("type") == "mock"):
                data = np.array([[n, p, k, temp, humidity, ph, rainfall]])
                prediction = model.predict(data)
                return prediction[0]
        except Exception:
            pass

    # 2. Heuristic Fallback: Nearest Neighbor Search in CSV
    if os.path.exists(csv_path):
        try:
            df = pd.read_csv(csv_path)
            # Calculate Euclidean distance for N, P, K, pH
            # (Simple normalization: diff / max_of_column)
            distances = []
            for _, row in df.iterrows():
                d = (
                    ((row['N'] - n)/100)**2 + 
                    ((row['P'] - p)/100)**2 + 
                    ((row['K'] - k)/100)**2 + 
                    ((row['pH'] - ph)/7)**2
                )
                distances.append(np.sqrt(d))
            
            best_match_idx = np.argmin(distances)
            return df.iloc[best_match_idx]['Crop']
        except Exception:
            pass
            
    return "rice" # Final fallback

def recommend_fertilizer(crop_name, n, p, k):
    import pandas as pd
    working_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(working_dir, "data", "fertilizer.csv")
    
    if not os.path.exists(csv_path):
        return "Ideal fertilizer data missing. Consult an expert."

    df = pd.read_csv(csv_path)
    crop_data = df[df['Crop'].str.lower() == crop_name.lower()]
    
    if crop_data.empty:
        return f"No fertilizer data available for {crop_name}."

    nr = crop_data['N'].iloc[0]
    pr = crop_data['P'].iloc[0]
    kr = crop_data['K'].iloc[0]

    diffs = {
        abs(nr - n): ("N", nr - n),
        abs(pr - p): ("P", pr - p),
        abs(kr - k): ("K", kr - k)
    }
    
    max_diff_val = max(diffs.keys())
    nutrient, val = diffs[max_diff_val]
    
    key = ""
    if nutrient == "N":
        key = "NHigh" if val < 0 else "Nlow"
    elif nutrient == "P":
        key = "PHigh" if val < 0 else "Plow"
    else:
        key = "KHigh" if val < 0 else "Klow"
        
    return fertilizer_dic.get(key, "Soil levels are balanced.")

if __name__ == "__main__":
    # Test logic
    if len(sys.argv) > 7:
        n, p, k = int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3])
        temp, hum = float(sys.argv[4]), float(sys.argv[5])
        ph, rain = float(sys.argv[6]), float(sys.argv[7])
        
        crop = recommend_crop(n, p, k, temp, hum, ph, rain)
        fert = recommend_fertilizer(crop, n, p, k)
        
        print(json.dumps({
            "crop": crop,
            "fertilizer": fert
        }))
