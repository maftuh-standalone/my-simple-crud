        const modal = document.getElementById("modalEdit");
        const modalDelete = document.getElementById("modalDelete");
        const hapusBtn = document.getElementById("hapusBtn");
        const cancelBtn2 = document.getElementById("cancelBtn2");
        const areaTxt = document.getElementById("areaTxt");
        const editBtn = document.getElementById("editBtn");
        const cancelBtn = document.getElementById("cancelBtn");
        const saveBtn = document.getElementById("saveBtn");
        const pushTxt = document.getElementById("pushTxt");
        const pushBtn = document.getElementById("pushBtn");
        const showList = document.getElementById("showList");
        const pubLish = document.getElementById("publish");

        const emptyMsg = document.createElement("p")
        emptyMsg.textContent = "Data masih kosong, silahkan isi!"
        emptyMsg.classList.add("emptyMsg")
        showList.before(emptyMsg)


        //* membuat array kosong * //

        let myArray = [];

        // ++ membuat penyimpanan sementara ++ //

        //  ## 1 save data menyimpan data setItem //
        //  ## 2. load data mengambil data set item //

        const saveData = () => {
            localStorage.setItem("myData", JSON.stringify(myArray));
        };

        const loadData = () => {
            const data = localStorage.getItem("myData");
            if (data) {
                myArray = JSON.parse(data);
            }
        };

        // *     membuat tombol atau input * //

        const createBtn = (tipe, kelas, value, aksi, id) => {
            const btn = document.createElement("input");
            btn.type = tipe;
            btn.className = kelas;
            btn.value = value;
            btn.dataset.action = aksi;
            btn.dataset.id = id;
            return btn;
        };

        pushBtn.addEventListener("click", () => {
            const text = pushTxt.value.trim();
            if (text === "") {
                alert("input tidak boleh kosong!");
                return;
            }
            myArray.push({
                nama: text,
                id: Date.now(),
            });
            alert("Data berhasil ditambahkan !")
            pushTxt.value = "";
            saveData();
            tampil();
        });

        const tampil = () => {
            showList.innerHTML = "";
            myArray.length > 0 ? emptyMsg.remove() : pubLish.contains(emptyMsg) || showList.before(emptyMsg)
            myArray.forEach((item) => {
                const span = document.createElement("span");
                span.textContent = item.nama;
                const li = document.createElement("li");
                const editBtn = createBtn(
                    "submit",
                    "editBtn",
                    "Edit",
                    "edit",
                    item.id
                );
                const delBtn = createBtn(
                    "submit",
                    "delBtn",
                    "Delete",
                    "delete",
                    item.id
                );
                li.appendChild(span);
                li.appendChild(editBtn);
                li.appendChild(delBtn);
                showList.appendChild(li);
            });
        };

        let idSedangDiedit = null;
        let idBaru = null;

        // --- BAGIAN EVENT LISTENER SHOWLIST ---
        showList.addEventListener("click", (e) => {
            if (!e.target.dataset.action) return;
            const aksi = e.target.dataset.action;
            let ids = Number(e.target.dataset.id);

            if (aksi === "edit") {
                // 1. Cari data yang mau diedit
                const itemDitemukan = myArray.find((item) => item.id === ids);

                if (itemDitemukan) {
                    // 2. Masukkan teks lama ke dalam textarea modal
                    areaTxt.value = itemDitemukan.nama;

                    // 3. Simpan ID-nya agar nanti bisa dicari saat klik Save
                    idSedangDiedit = ids;

                    // 4. Munculkan modal
                    modal.showModal();
                }
            }

            if (aksi === "delete") {
                const idBarus = myArray.filter((item) => item.id !== ids);
                if (idBarus) {
                    idBaru = ids
                    deleteData()
                }
            }
        });


        const deleteData = () => {
            modalDelete.showModal()
        }

        // --- BAGIAN TOMBOL SAVE DI MODAL ---
        saveBtn.addEventListener("click", () => {
            if (idSedangDiedit !== null) {
                // 1. Ambil teks baru dari textarea
                const teksBaru = areaTxt.value;

                // 2. Cari index data tersebut di dalam myArray
                const index = myArray.findIndex((item) => item.id === idSedangDiedit);

                if (index !== -1) {
                    // 3. Update datanya
                    myArray[index].nama = teksBaru;

                    // 4. Simpan ke LocalStorage dan Refresh tampilan
                    saveData();
                    tampil();
                }

                // 5. Reset ID dan tutup modal
                idSedangDiedit = null;
                modal.close();
            }
        });

        cancelBtn.addEventListener("click", () => {
            modal.close();
            modalDelete.close()
        });

        cancelBtn2.addEventListener("click", () => {
            modalDelete.close()
        });
        hapusBtn.addEventListener("click", () => {
            if (idBaru !== null) {
                myArray = myArray.filter((item) => item.id !== idBaru);
                saveData();
                tampil();
            }
            idBaru = null
            modalDelete.close()
            alert("dihapus!")
        });

        loadData();
        tampil();

        // --- BAGIAN NAVIGASI HAMBURGER ---
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("navMenu");

        if (hamburger && navMenu) {
            hamburger.addEventListener("click", () => {
                navMenu.classList.toggle("active");
            });
        }