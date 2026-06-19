{
  "name": "wisdom-desktop",
  "version": "1.0.0",
  "main": "src/main.html",
  "scripts": {
    "tauri": "tauri dev"
  },
  "dependencies": {}
}

{
  "total_projects_analyzed": 3,
  "common_patterns": [
    {
      "pattern_id": "resettlement_delay_consultation",
      "description": "Delays caused by inadequate stakeholder consultation",
      "projects_affected": ["Antamina", "ProjectB"],
      "confidence_score": 0.89
    },
    {
      "pattern_id": "compensation_disputes",
      "description": "Monetary compensation led to disputes",
      "projects_affected": ["ProjectC"],
      "confidence_score": 0.76
    }
  ],
  "recommended_best_practices": [
    {
      "practice": "Early Baseline Surveys",
      "reason": "Prevents resettlement delays",
      "applicable_to": ["resettlement_delay_consultation"]
    },
    {
      "practice": "Hybrid Compensation Models",
      "reason": "Reduces disputes over monetary-only schemes",
      "applicable_to": ["compensation_disputes"]
    }
  ]
}

{
  "build": {
    "distDir": "../src",
    "devPath": "http://localhost:8080",
    "beforeDevCommand": "",
    "beforeBuildCommand": ""
  },
  "tauri": {
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "com.example.wisdom.desktop",
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ]
    },
    "security": {
      "csp": null
    },
    "updater": {
      "active": false
    },
    "windows": [
      {
        "title": "Wisdom Syndicate",
        "width": 1000,
        "height": 600,
        "resizable": true,
        "decorations": true
      }
    ],
    "macOS": {
      "exceptionDomain": null
    }
  }
}