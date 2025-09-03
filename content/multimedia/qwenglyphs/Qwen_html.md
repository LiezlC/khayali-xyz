<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Wisdom Syndicate - Knowledge Synthesis Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { padding: 20px; background: #f9f9f9; }
    .drop-zone {
      border: 2px dashed #ccc;
      border-radius: 10px;
      padding: 30px;
      text-align: center;
      color: #aaa;
      transition: background 0.3s;
    }
    .drop-zone.dragover {
      background: #eef6ff;
      color: #333;
    }
    .file-list { margin-top: 10px; }
    .output-section { margin-top: 30px; }
  </style>
</head>
<body>

<div class="container">

  <h1 class="mb-4">🧠 Wisdom Syndicate Dashboard</h1>

  <!-- Input Section -->
  <div class="card mb-4">
    <div class="card-header">📥 Upload Files</div>
    <div class="card-body">
      <div id="dropZone" class="drop-zone">
        Drag & drop files here<br>or<br><input type="file" id="fileInput" multiple accept=".docx,.pdf">
      </div>
      <ul id="fileList" class="list-group file-list"></ul>
    </div>
  </div>

  <!-- Processing Log -->
  <div class="card mb-4">
    <div class="card-header">⚙️ Processing Log</div>
    <div class="card-body">
      <pre id="logOutput" style="height:200px; overflow-y:auto;"></pre>
    </div>
  </div>

  <!-- Output Dashboard -->
  <div class="output-section">
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">🔍 Identified Patterns</div>
          <div class="card-body">
            <ul id="patternsOutput" class="list-group"></ul>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-4">
          <div class="card-header">✅ Best Practices</div>
          <div class="card-body">
            <ul id="practicesOutput" class="list-group"></ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card mb-4">
      <div class="card-header">📄 Full Synthesis Report</div>
      <div class="card-body">
        <textarea id="fullReport" class="form-control" rows="10" readonly></textarea>
      </div>
    </div>
    <div class="text-center mb-4">
      <button class="btn btn-primary me-2" onclick="exportJSON()">Export JSON</button>
      <button class="btn btn-success me-2" onclick="exportPDF()">Export PDF</button>
      <button class="btn btn-secondary" onclick="exportCSV()">Export CSV</button>
    </div>
  </div>

</div>

<!-- Scripts -->
<script>
  const dropZone = document.getElementById('dropZone');
  const fileInput = document.getElementById('fileInput');
  const fileList = document.getElementById('fileList');
  const logOutput = document.getElementById('logOutput');

  const patternsOutput = document.getElementById('patternsOutput');
  const practicesOutput = document.getElementById('practicesOutput');
  const fullReport = document.getElementById('fullReport');

  let uploadedFiles = [];

  // Drag and Drop Handling
  dropZone.addEventListener('click', () => fileInput.click());
  dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener('change', e => handleFiles(e.target.files));

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!['.docx', '.pdf'].includes(file.name.slice(-5))) {
        alert(`Unsupported file type: ${file.name}`);
        return;
      }
      uploadedFiles.push(file);
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = file.name;
      fileList.appendChild(li);
    });
  }

  // Simulate processing
  async function processFiles() {
    log("Starting Wisdom Syndicate analysis...");
    uploadedFiles.forEach((file, index) => {
      log(`Processing file ${index+1} of ${uploadedFiles.length}: ${file.name}`);
      simulateProcessing(file);
    });
    log("Analysis complete.");
  }

  function simulateProcessing(file) {
    setTimeout(() => {
      const mockPatterns = [
        "Pattern: Resettlement delays due to insufficient consultation",
        "Pattern: Compensation disputes from unclear criteria"
      ];
      const mockPractices = [
        "Best Practice: Early baseline surveys improve resettlement outcomes",
        "Best Practice: Hybrid compensation models reduce disputes"
      ];
      mockPatterns.forEach(p => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = p;
        patternsOutput.appendChild(li);
      });
      mockPractices.forEach(p => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = p;
        practicesOutput.appendChild(li);
      });
      fullReport.value = JSON.stringify({
        total_projects_analyzed: uploadedFiles.length,
        common_patterns: mockPatterns,
        recommended_best_practices: mockPractices
      }, null, 2);
    }, 1000);
  }

  function log(message) {
    logOutput.textContent += `[${new Date().toLocaleTimeString()}] ${message}\n`;
    logOutput.scrollTop = logOutput.scrollHeight;
  }

  function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(fullReport.value);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "wisdom_synthesis.json");
    document.body.appendChild(dlAnchorElem);
    dlAnchorElem.click();
    document.body.removeChild(dlAnchorElem);
  }

  function exportPDF() {
    alert("PDF Export requires additional library integration (e.g., jsPDF). Not implemented in this demo.");
  }

  function exportCSV() {
    const csvContent = "ProjectID,Pattern\nAntamina,Resettlement Delays\nPiruro,Compensation Disputes";
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wisdom_patterns.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

</script>

</body>
</html>