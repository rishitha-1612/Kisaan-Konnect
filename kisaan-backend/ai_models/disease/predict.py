import os
import sys

# Force pure-python implementation for windows compatibility
os.environ['PROTOCOL_BUFFERS_PYTHON_IMPLEMENTATION'] = 'python'

import json
import numpy as np
from PIL import Image

# For local robustness if TF is missing
def get_tf():
    try:
        import tensorflow as tf
        return tf
    except ImportError:
        return None

# Source: SiddharthDhirde repository + Harvestify treatment logic
recommendations = {
    "Apple___Apple_scab": "Choose resistant varieties. Rake and destroy infected leaves. Water early morning (avoid overhead).",
    "Apple___Black_rot": "Prune dead/diseased branches. Remove infected material. Remove dead stumps.",
    "Apple___Cedar_apple_rust": "Prune juniper galls nearby. Remove branches 4-6 inches below galls.",
    "Tomato___Early_blight": "Apply mancozeb-based fungicides. Remove lower leaves to prevent splash infection.",
    "Potato___Late_blight": "Apply chlorothalonil or copper-based fungicides. Ensure good air circulation.",
    "Corn_(maize)___Common_rust_": "Use resistant hybrids. Apply fungicides like mancozeb if infection is severe.",
    "Grape___Black_rot": "Prune infected vines and remove mummified berries. Apply fungicides early in the season.",
    "healthy": "Your crop is healthy! Maintain regular watering and nutrition."
}

def predict(image_path):
    working_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(working_dir, "plant_disease_prediction_model.h5")
    class_indices_path = os.path.join(working_dir, "class_indices.json")

    # Load class labels
    with open(class_indices_path, 'r') as f:
        class_indices = json.load(f)

    tf = get_tf()
    
    if not os.path.exists(model_path) or tf is None:
        return {"error": "The disease detection model is still training. Please wait until training completes."}
    
    # Load model
    model = tf.keras.models.load_model(model_path)
    
    # Preprocess
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.

    # Predict
    predictions = model.predict(img_array)
    class_idx = str(np.argmax(predictions, axis=1)[0])
    class_name = class_indices.get(class_idx, "Unknown___Unknown")
    confidence = f"{round(float(np.max(predictions)) * 100, 1)}%"

    # Common result parsing
    if "___" in class_name:
        plant, disease = class_name.split("___")
    else:
        plant, disease = "Unknown", class_name

    # Extract treatment
    treatment = "Consult an agronomist for specific treatment advice."
    for key in recommendations:
        if key.lower() in class_name.lower():
            treatment = recommendations[key]
            break

    return {
        "plant": plant.replace("_", " "),
        "disease": disease.replace("_", " "),
        "confidence": confidence,
        "treatment": treatment
    }

if __name__ == "__main__":
    if len(sys.argv) > 1:
        result = predict(sys.argv[1])
        print(json.dumps(result))
