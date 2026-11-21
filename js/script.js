document.addEventListener("DOMContentLoaded", () => {
    const formSiswa = document.getElementById("form-siswa");
    const tabelSiswa = document.getElementById("tabel-siswa");
    const searchInput = document.getElementById("search-input");
    const alertBox = document.getElementById("alert-box");

    // Elemen Form
    const inputId = document.getElementById("siswa-id");
    const inputNis = document.getElementById("nis");
    const inputNama = document.getElementById("nama");
    const inputKelas = document.getElementById("kelas");
    const inputJurusan = document.getElementById("jurusan");
    const formTitle = document.getElementById("form-title");
    const btnSubmit = document.getElementById("btn-submit");
    const btnBatal = document.getElementById("btn-batal");

    // 1. Fungsi Menampilkan Notifikasi JSON Response
    function showAlert(status, message) {
        alertBox.className = `alert ${status === "success" ? "alert-success" : "alert-error"}`;
        alertBox.textContent = message;
        alertBox.classList.remove("hidden");

        setTimeout(() => {
            alertBox.classList.add("hidden");
        }, 3500);
    }

    // 2. Fungsi Memuat Data Siswa (AJAX Fetch)
    async function loadSiswa(keyword = "") {
        try {
            const response = await fetch(`proses/tampil.php?q=${encodeURIComponent(keyword)}`);
            const result = await response.json();

            tabelSiswa.innerHTML = "";

            if (result.status === "success" && result.data.length > 0) {
                result.data.forEach((siswa, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${escapeHtml(siswa.nis)}</td>
                            <td>${escapeHtml(siswa.nama)}</td>
                            <td>${escapeHtml(siswa.kelas)}</td>
                            <td>${escapeHtml(siswa.jurusan)}</td>
                            <td>
                                <button class="btn-action btn-edit" 
                                    data-id="${siswa.id}" 
                                    data-nis="${escapeHtml(siswa.nis)}" 
                                    data-nama="${escapeHtml(siswa.nama)}" 
                                    data-kelas="${escapeHtml(siswa.kelas)}" 
                                    data-jurusan="${escapeHtml(siswa.jurusan)}">Edit</button>
                                <button class="btn-action btn-hapus" data-id="${siswa.id}">Hapus</button>
                            </td>
                        </tr>
                    `;
                    tabelSiswa.insertAdjacentHTML("beforeend", row);
                });
            } else {
                tabelSiswa.innerHTML = `<tr><td colspan="6" class="text-center">Data siswa tidak ditemukan.</td></tr>`;
            }
        } catch (error) {
            showAlert("error", "Terjadi kesalahan saat memuat data.");
        }
    }

    // Mencegah XSS
    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    // 3. Real-Time Validation
    function validateField(input, errorId, condition, message) {
        const errorEl = document.getElementById(errorId);
        if (!condition) {
            input.classList.add("invalid");
            errorEl.textContent = message;
            return false;
        } else {
            input.classList.remove("invalid");
            errorEl.textContent = "";
            return true;
        }
    }

    function validateForm() {
        const validNis = validateField(inputNis, "error-nis", /^\d{4,15}$/.test(inputNis.value.trim()), "NIS harus berupa angka (4-15 digit).");
        const validNama = validateField(inputNama, "error-nama", inputNama.value.trim().length >= 3, "Nama minimal 3 karakter.");
        const validKelas = validateField(inputKelas, "error-kelas", inputKelas.value !== "", "Silakan pilih kelas.");
        const validJurusan = validateField(inputJurusan, "error-jurusan", inputJurusan.value !== "", "Silakan pilih jurusan.");

        return validNis && validNama && validKelas && validJurusan;
    }

    inputNis.addEventListener("input", () => validateField(inputNis, "error-nis", /^\d{4,15}$/.test(inputNis.value.trim()), "NIS harus berupa angka (4-15 digit)."));
    inputNama.addEventListener("input", () => validateField(inputNama, "error-nama", inputNama.value.trim().length >= 3, "Nama minimal 3 karakter."));
    inputKelas.addEventListener("change", () => validateField(inputKelas, "error-kelas", inputKelas.value !== "", "Silakan pilih kelas."));
    inputJurusan.addEventListener("change", () => validateField(inputJurusan, "error-jurusan", inputJurusan.value !== "", "Silakan pilih jurusan."));

    // 4. Tambah & Ubah Data (Event Submit + AJAX)
    formSiswa.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData(formSiswa);
        const isEdit = inputId.value !== "";
        const url = isEdit ? "proses/edit.php" : "proses/tambah.php";

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData
            });
            const result = await response.json();

            showAlert(result.status, result.message);

            if (result.status === "success") {
                resetForm();
                loadSiswa(searchInput.value);
            }
        } catch (error) {
            showAlert("error", "Gagal menghubungi server.");
        }
    });

    // 5. Event Delegation untuk Tombol Edit & Hapus
    tabelSiswa.addEventListener("click", async (e) => {
        const target = e.target;

        // Tombol Edit
        if (target.classList.contains("btn-edit")) {
            inputId.value = target.dataset.id;
            inputNis.value = target.dataset.nis;
            inputNama.value = target.dataset.nama;
            inputKelas.value = target.dataset.kelas;
            inputJurusan.value = target.dataset.jurusan;

            formTitle.textContent = "Edit Data Siswa";
            btnSubmit.textContent = "Update Data";
            btnBatal.classList.remove("hidden");
            validateForm();
        }

        // Tombol Hapus
        if (target.classList.contains("btn-hapus")) {
            const id = target.dataset.id;
            if (!confirm("Yakin ingin menghapus data siswa ini?")) return;

            const formData = new FormData();
            formData.append("id", id);

            try {
                const response = await fetch("proses/hapus.php", {
                    method: "POST",
                    body: formData
                });
                const result = await response.json();

                showAlert(result.status, result.message);
                if (result.status === "success") {
                    loadSiswa(searchInput.value);
                }
            } catch (error) {
                showAlert("error", "Gagal menghapus data.");
            }
        }
    });

    // Reset Form ke Mode Tambah
    function resetForm() {
        formSiswa.reset();
        inputId.value = "";
        formTitle.textContent = "Tambah Data Siswa";
        btnSubmit.textContent = "Simpan Data";
        btnBatal.classList.add("hidden");
        document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
        document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
    }

    btnBatal.addEventListener("click", resetForm);

    // 6. Pencarian Real-Time dengan Debounce
    let debounceTimer;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            loadSiswa(searchInput.value.trim());
        }, 300); // Tunggu 300ms setelah user berhenti mengetik
    });

    // Muat data awal saat halaman dibuka
    loadSiswa();
});