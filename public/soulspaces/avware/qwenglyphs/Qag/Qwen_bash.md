wisdom-desktop/
├── src-tauri/
│   ├── Cargo.toml
│   └── tauri.conf.json
├── src/
│   ├── main.html
│   └── main.js
├── backend/
│   └── wisdom_agent.py
├── package.json
└── README.md

npm install -g @tauri-apps/cli

  npm run tauri

  cd wisdom-desktop
tauri init --dist-dir src --dev-server-url http://localhost:8080


python wisdom_integration.py \
  120127_Benchmarking_Report_Antamina.docx \
  120128_Resettlement_Study_ProjectB.docx \
  120129_Compensation_Report_ProjectC.docx\
