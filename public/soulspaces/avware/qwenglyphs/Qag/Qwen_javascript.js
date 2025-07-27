const { invoke } = window.__TAURI__.tauri;

document.getElementById('fileInput').addEventListener('change', async function () {
  const files = Array.from(this.files);
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = '';

  files.forEach(file => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = file.name;
    fileList.appendChild(li);
  });

  // Send files to Python backend
  const filePaths = files.map(f => f.path);
  const result = await invoke('process_files', { paths: filePaths });
  document.getElementById('reportOutput').value = JSON.stringify(result, null, 2);
});