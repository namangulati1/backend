# 🚀 AI Log Intelligence System

An AI-powered backend system that analyzes application logs, detects error patterns, and provides actionable insights using a locally hosted LLM (Gemma via Ollama).

---

## 🔥 Features

- 🧠 AI-based log analysis
- 🔍 Error classification (Network, DB, Auth)
- 📊 Analytics dashboard APIs
- 🔁 Duplicate log detection
- 🔐 Environment-based config
- 🐳 Docker support

---

## 🏗️ Architecture

Frontend (optional)
↓
NestJS Backend
↓
Ollama (Gemma 4)
↓
PostgreSQL

---

## ⚙️ Tech Stack

- NestJS
- PostgreSQL
- Ollama (Gemma)
- TypeORM
- Docker

---

## 🚀 API Endpoints

### Analyze Log

POST /logs/analyze

### Get Analytics

GET /logs/analytics

---

## 🧪 Example

Input:

```json
{
  "log": "Error: connect ETIMEDOUT 127.0.0.1:5432"
}
```
