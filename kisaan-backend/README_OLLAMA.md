# Kisaan Mitra AI: Local LLM Setup (Ollama)

This application has been updated to use **Ollama** for all AI features so that it can run entirely offline without needing any paid APIs like Gemini or OpenAI.

Follow these steps to install Ollama and download the required models.

## 1. Install Ollama
Download and install Ollama for Windows from the official website:
👉 **[Download Ollama for Windows](https://ollama.com/download/windows)**

Run the downloaded installer (`OllamaSetup.exe`). Once installed, Ollama will run in the background (you'll see an icon in your system tray).

## 2. Download Required Models

Open **PowerShell** or **Command Prompt** and run the following commands one by one to download the necessary AI models to your machine. 

*(Note: These models are large (around 4-5 GB each) and may take several minutes to download depending on your internet speed).*

### Text Chat Model (llama3)
This model powers the text-based Kisaan Mitra AI chat interface.

```powershell
ollama pull llama3
```

### Vision/Image Scanning Model (llava)
This model powers the offline crop disease diagnosis tool (`/upload-image`).

```powershell
ollama pull llava
```

## 3. Verify it's Running
Ollama runs a local API server automatically at `http://localhost:11434`.
The backend will automatically connect to this local URL.

To verify the models are installed correctly, run:
```powershell
ollama list
```
You should see `llama3` and `llava` in the list.

## 4. Troubleshooting
- **"Ollama Local AI Error" in App:** If the app shows an error about Ollama missing, verify that the Ollama application is actually running in your Windows tray, or run `ollama serve` in a new terminal window.
- **Slow Responses:** Running LLMs locally requires computer memory (RAM). If responses are very slow, ensure you have at least 8GB of free RAM and ideally a dedicated GPU (Ollama automatically offloads to Nvidia GPUs if available).
