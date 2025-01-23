/**
 * Aplikasi Kalkulator Lengkap
 * @author Nur Dwi Priyambodo
 * @version 1.0.0
 * 
 * Script ini menangani semua fungsi kalkulator termasuk:
 * - Operasi aritmatika dasar
 * - Perhitungan sains
 * - Perhitungan geometri
 * - Perhitungan keuangan
 * - Pengaturan tema
 * - Pintasan keyboard
 */

// Variabel global
let display = document.getElementById("result");
let currentTheme = localStorage.getItem("theme") || "light";

/**
 * Fungsi Kalkulator Dasar
 * -----------------------
 */

/**
 * Menambahkan angka ke tampilan
 * @param {string} num - Angka yang akan ditambahkan
 */
function appendNumber(num) {
  display.value += num;
}

function appendOperator(operator) {
  display.value += operator;
}

function clearDisplay() {
  display.value = "";
}

function deleteChar() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Kesalahan";
  }
}

function changeCalculator(type) {
  document.querySelectorAll(".calc-type").forEach((calc) => {
    calc.classList.remove("active");
  });
  document.querySelectorAll(".type-selector button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(`${type}-calc`).classList.add("active");
  event.target.classList.add("active");
}

/**
 * Fungsi Kalkulator Sains
 * ----------------------
 */

/**
 * Menghitung fungsi trigonometri
 * @param {string} func - Jenis fungsi trigonometri (sin/cos/tan)
 */
function calculateTrig(func) {
  try {
    const value = parseFloat(display.value);
    switch (func) {
      case "sin":
        display.value = Math.sin((value * Math.PI) / 180);
        break;
      case "cos":
        display.value = Math.cos((value * Math.PI) / 180);
        break;
      case "tan":
        display.value = Math.tan((value * Math.PI) / 180);
        break;
    }
  } catch (error) {
    display.value = "Error";
  }
}

function calculatePower(type) {
  try {
    const value = parseFloat(display.value);
    switch (type) {
      case "square":
        display.value = Math.pow(value, 2);
        break;
      case "cube":
        display.value = Math.pow(value, 3);
        break;
    }
  } catch (error) {
    display.value = "Error";
  }
}

function calculateRoot(type) {
  try {
    const value = parseFloat(display.value);
    switch (type) {
      case "sqrt":
        display.value = Math.sqrt(value);
        break;
      case "cbrt":
        display.value = Math.cbrt(value);
        break;
    }
  } catch (error) {
    display.value = "Error";
  }
}

function calculateLog(type) {
  try {
    const value = parseFloat(display.value);
    switch (type) {
      case "log":
        display.value = Math.log10(value);
        break;
      case "ln":
        display.value = Math.log(value);
        break;
    }
  } catch (error) {
    display.value = "Error";
  }
}

function calculateFactorial() {
  try {
    const num = parseInt(display.value);
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

let currentCalculation = null;
let modalInputs = {};

function showModal(title, inputs, callback) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalInputsDiv = document.getElementById("modal-inputs");

  modalTitle.textContent = title;
  modalInputsDiv.innerHTML = "";
  modalInputs = {};

  inputs.forEach((input) => {
    const label = document.createElement("label");
    label.className = "modal-label";
    label.textContent = input.label;

    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.className = "modal-input";
    inputElement.placeholder = input.placeholder;

    modalInputsDiv.appendChild(label);
    modalInputsDiv.appendChild(inputElement);
    modalInputs[input.id] = inputElement;
  });

  currentCalculation = callback;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function submitModal() {
  const values = {};
  for (let id in modalInputs) {
    if (id === "currency") {
      values[id] = modalInputs[id].value; // Ambil value dari select element
    } else {
      values[id] = parseFloat(modalInputs[id].value);
    }
  }
  currentCalculation(values);
  closeModal();
}

function calculateShape(shape) {
  switch (shape) {
    case "circle":
      showModal(
        "Luas Lingkaran",
        [
          {
            id: "radius",
            label: "Jari-jari",
            placeholder: "Masukkan jari-jari",
          },
        ],
        (values) => {
          display.value = (Math.PI * values.radius * values.radius).toFixed(2);
        }
      );
      break;
    case "square":
      showModal(
        "Luas Persegi",
        [
          {
            id: "side",
            label: "Panjang Sisi",
            placeholder: "Masukkan panjang sisi",
          },
        ],
        (values) => {
          display.value = (values.side * values.side).toFixed(2);
        }
      );
      break;
    case "triangle":
      showModal(
        "Luas Segitiga",
        [
          { id: "base", label: "Alas", placeholder: "Masukkan alas" },
          { id: "height", label: "Tinggi", placeholder: "Masukkan tinggi" },
        ],
        (values) => {
          display.value = (0.5 * values.base * values.height).toFixed(2);
        }
      );
      break;
  }
}

function calculate3D(shape) {
  switch (shape) {
    case "sphere":
      showModal(
        "Volume Bola",
        [
          {
            id: "radius",
            label: "Jari-jari",
            placeholder: "Masukkan jari-jari",
          },
        ],
        (values) => {
          display.value = (
            (4 / 3) *
            Math.PI *
            Math.pow(values.radius, 3)
          ).toFixed(2);
        }
      );
      break;
    case "cube":
      showModal(
        "Volume Kubus",
        [
          {
            id: "side",
            label: "Panjang Sisi",
            placeholder: "Masukkan panjang sisi",
          },
        ],
        (values) => {
          display.value = Math.pow(values.side, 3).toFixed(2);
        }
      );
      break;
    case "cylinder":
      showModal(
        "Volume Tabung",
        [
          {
            id: "radius",
            label: "Jari-jari",
            placeholder: "Masukkan jari-jari",
          },
          { id: "height", label: "Tinggi", placeholder: "Masukkan tinggi" },
        ],
        (values) => {
          display.value = (
            Math.PI *
            values.radius *
            values.radius *
            values.height
          ).toFixed(2);
        }
      );
      break;
  }
}

/**
 * Fungsi Kalkulator Keuangan
 * -------------------------
 */

/**
 * Format nilai mata uang berdasarkan lokasi
 * @param {number} amount - Jumlah yang akan diformat
 * @param {string} currency - Kode mata uang (IDR/USD/EUR/dll)
 * @returns {string} String mata uang yang telah diformat
 */
function formatCurrency(amount, currency) {
  if (isNaN(amount)) return "Error: Invalid Amount";

  try {
    // Pastikan currency adalah string yang valid
    currency = String(currency).toUpperCase();

    let formatter;
    switch (currency) {
      case "IDR":
        formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        break;
      case "USD":
        formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        break;
      case "EUR":
        formatter = new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        break;
      case "JPY":
        formatter = new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
        break;
      case "SGD":
        formatter = new Intl.NumberFormat("en-SG", {
          style: "currency",
          currency: "SGD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        break;
      default:
        throw new Error("Invalid currency");
    }

    return formatter.format(amount);
  } catch (error) {
    console.error("Currency formatting error:", error);
    return "Error: Format Error";
  }
}

function showFinancialModal(title, inputs, callback) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalInputsDiv = document.getElementById("modal-inputs");

  modalTitle.textContent = title;
  modalInputsDiv.innerHTML = "";
  modalInputs = {};

  // Tambahkan pemilihan mata uang
  const currencyLabel = document.createElement("label");
  currencyLabel.className = "modal-label";
  currencyLabel.textContent = "Mata Uang";

  const currencySelect = document.createElement("select");
  currencySelect.className = "modal-input";
  const currencies = [
    { code: "IDR", name: "Rupiah" },
    { code: "USD", name: "Dollar AS" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Yen Jepang" },
    { code: "SGD", name: "Dollar Singapura" },
  ];

  currencies.forEach((curr) => {
    const option = document.createElement("option");
    option.value = curr.code;
    option.textContent = curr.name;
    currencySelect.appendChild(option);
  });

  modalInputsDiv.appendChild(currencyLabel);
  modalInputsDiv.appendChild(currencySelect);
  modalInputs["currency"] = currencySelect;

  // Tambahkan input lainnya
  inputs.forEach((input) => {
    const label = document.createElement("label");
    label.className = "modal-label";
    label.textContent = input.label;

    const inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.className = "modal-input";
    inputElement.placeholder = input.placeholder;

    modalInputsDiv.appendChild(label);
    modalInputsDiv.appendChild(inputElement);
    modalInputs[input.id] = inputElement;
  });

  currentCalculation = (values) => {
    // Pastikan semua nilai adalah angka yang valid
    const numericValues = {};
    for (let key in values) {
      if (key === "currency") {
        numericValues[key] = values[key];
      } else {
        const num = parseFloat(values[key]);
        if (isNaN(num)) {
          display.value = "Error: Invalid Input";
          closeModal();
          return;
        }
        numericValues[key] = num;
      }
    }

    try {
      const result = callback(numericValues);
      if (isNaN(result)) {
        display.value = "Error: Calculation Error";
      } else {
        const formattedResult = formatCurrency(result, values.currency);
        display.value = formattedResult;
      }
    } catch (error) {
      display.value = "Error: Calculation Failed";
    }
  };
  modal.style.display = "block";
}

function calculateFinancial(type) {
  switch (type) {
    case "compound":
      showFinancialModal(
        "Bunga Majemuk",
        [
          {
            id: "principal",
            label: "Modal Awal",
            placeholder: "Masukkan modal awal",
          },
          {
            id: "rate",
            label: "Suku Bunga (%)",
            placeholder: "Masukkan suku bunga",
          },
          {
            id: "time",
            label: "Jangka Waktu (tahun)",
            placeholder: "Masukkan jangka waktu",
          },
          {
            id: "n",
            label: "Periode per Tahun",
            placeholder: "Masukkan periode per tahun",
          },
        ],
        (values) => {
          const principal = values.principal;
          const rate = values.rate / 100; // Mengubah persentase ke desimal
          const time = values.time;
          const n = values.n;
          return principal * Math.pow(1 + rate / n, n * time);
        }
      );
      break;
    case "simple":
      showFinancialModal(
        "Bunga Tunggal",
        [
          {
            id: "principal",
            label: "Modal Awal",
            placeholder: "Masukkan modal awal",
          },
          {
            id: "rate",
            label: "Suku Bunga (%)",
            placeholder: "Masukkan suku bunga",
          },
          {
            id: "time",
            label: "Jangka Waktu (tahun)",
            placeholder: "Masukkan jangka waktu",
          },
        ],
        (values) => {
          const principal = values.principal;
          const rate = values.rate / 100; // Mengubah persentase ke desimal
          const time = values.time;
          return principal * (1 + rate * time);
        }
      );
      break;
    case "mortgage":
      showFinancialModal(
        "Perhitungan KPR",
        [
          {
            id: "loan",
            label: "Jumlah Pinjaman",
            placeholder: "Masukkan jumlah pinjaman",
          },
          {
            id: "rate",
            label: "Suku Bunga Tahunan (%)",
            placeholder: "Masukkan suku bunga",
          },
          {
            id: "months",
            label: "Jangka Waktu (bulan)",
            placeholder: "Masukkan jangka waktu",
          },
        ],
        (values) => {
          const monthlyRate = values.rate / 1200; // Mengubah suku bunga tahunan ke bulanan
          const monthlyPayment =
            (values.loan *
              monthlyRate *
              Math.pow(1 + monthlyRate, values.months)) /
            (Math.pow(1 + monthlyRate, values.months) - 1);
          return monthlyPayment;
        }
      );
      break;
    case "investment":
      showFinancialModal(
        "Perhitungan Investasi",
        [
          {
            id: "principal",
            label: "Jumlah Investasi",
            placeholder: "Masukkan jumlah investasi",
          },
          {
            id: "rate",
            label: "Perkiraan Return (%)",
            placeholder: "Masukkan perkiraan return",
          },
          {
            id: "time",
            label: "Jangka Waktu (tahun)",
            placeholder: "Masukkan jangka waktu",
          },
        ],
        (values) => {
          return (
            values.principal * Math.pow(1 + values.rate / 100, values.time)
          );
        }
      );
      break;
  }
}

/**
 * Fungsi Antarmuka
 * ---------------
 */

/**
 * Mengubah tema kalkulator antara mode terang dan gelap
 * Menyimpan pilihan tema di localStorage
 */
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon();

  // Memaksa pembaruan tampilan
  document.body.style.display = 'none';
  document.body.offsetHeight; // Memicu reflow
  document.body.style.display = '';
}

function updateThemeIcon() {
  const themeButton = document.getElementById("themeToggle");
  themeButton.innerHTML = currentTheme === "light" ? "🌙" : "☀️";
}

// Menampilkan informasi hak cipta
console.log(
  "© 2025 Nur Dwi Priyambodo. Kalkulator Lengkap. Hak Cipta Dilindungi."
);

/**
 * Event Listeners
 * --------------
 */

// Penangan input keyboard
document.addEventListener("keydown", function (event) {
  // Cek jika modal sedang terbuka, jangan proses input keyboard
  if (document.getElementById("modal").style.display === "block") {
    return;
  }

  // Mencegah default action untuk beberapa tombol
  if (["+", "-", "*", "/", "=", "Enter", "Escape"].includes(event.key)) {
    event.preventDefault();
  }

  // Numbers dan decimal
  if (/^[0-9]$/.test(event.key)) {
    appendNumber(event.key);
  }
  // Decimal point
  else if (event.key === ".") {
    appendNumber(".");
  }
  // Operators
  else if (["+", "-", "*", "/"].includes(event.key)) {
    appendOperator(event.key);
  } else if (event.key === "%") {
    appendOperator("%");
  }
  // Equal sign atau Enter untuk menghitung
  else if (event.key === "=" || event.key === "Enter") {
    calculate();
  }
  // Backspace untuk menghapus karakter terakhir
  else if (event.key === "Backspace") {
    deleteChar();
  }
  // Escape untuk clear
  else if (event.key === "Escape") {
    clearDisplay();
  }
  // Tanda kurung
  else if (event.key === "(") {
    appendOperator("(");
  } else if (event.key === ")") {
    appendOperator(")");
  }

  // Scientific calculator shortcuts
  if (document.getElementById("scientific-calc").classList.contains("active")) {
    switch (event.key.toLowerCase()) {
      case "s": // sin
        calculateTrig("sin");
        break;
      case "c": // cos
        calculateTrig("cos");
        break;
      case "t": // tan
        calculateTrig("tan");
        break;
      case "l": // log
        calculateLog("log");
        break;
      case "n": // ln
        calculateLog("ln");
        break;
      case "q": // square (q for quadratic)
        calculatePower("square");
        break;
      case "u": // cube
        calculatePower("cube");
        break;
      case "r": // root
        calculateRoot("sqrt");
        break;
    }
  }
});

// Tambahkan fungsi untuk menampilkan/menyembunyikan Keyboard Shortcuts
function toggleKeyboardShortcuts() {
  const shortcuts = document.getElementById("keyboardShortcuts");
  const overlay = document.querySelector(".keyboard-shortcuts-overlay");
  if (shortcuts.classList.contains("active")) {
    shortcuts.classList.remove("active");
    if (overlay) overlay.remove();
  } else {
    shortcuts.classList.add("active");
    if (!overlay) {
      const newOverlay = document.createElement("div");
      newOverlay.className = "keyboard-shortcuts-overlay";
      document.body.appendChild(newOverlay);
    }
  }
}

// Modifikasi event listener untuk keyboard
document.addEventListener("keydown", function (event) {
  // Cek jika modal sedang terbuka, jangan proses input keyboard
  if (document.getElementById("modal").style.display === "block") {
    return;
  }

  // Tampilkan/sembunyikan Keyboard Shortcuts saat '?' ditekan
  if (event.key === "?") {
    event.preventDefault();
    toggleKeyboardShortcuts();
    return;
  }

  // Sembunyikan Keyboard Shortcuts saat 'Escape' ditekan
  if (event.key === "Escape") {
    const shortcuts = document.getElementById("keyboardShortcuts");
    if (shortcuts.classList.contains("active")) {
      toggleKeyboardShortcuts();
      return;
    }
  }

});

// Modifikasi event listener untuk tombol close pada Keyboard Shortcuts
document.querySelector(".close-hints").addEventListener("click", toggleKeyboardShortcuts);

// Modifikasi event listener untuk overlay
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("keyboard-shortcuts-overlay")) {
    toggleKeyboardShortcuts();
  }
});

// Tambahkan fungsi untuk menangani keyboard shortcuts hint
document.getElementById("showHints").addEventListener("click", function () {
  const shortcuts = document.getElementById("keyboardShortcuts");
  const overlay = document.createElement("div");
  overlay.className = "keyboard-shortcuts-overlay";
  document.body.appendChild(overlay);

  shortcuts.classList.add("active");
  overlay.classList.add("active");
});

document.querySelector(".close-hints").addEventListener("click", function () {
  const shortcuts = document.getElementById("keyboardShortcuts");
  const overlay = document.querySelector(".keyboard-shortcuts-overlay");

  shortcuts.classList.remove("active");
  overlay.remove();
});

// Tutup hints ketika mengklik overlay
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("keyboard-shortcuts-overlay")) {
    const shortcuts = document.getElementById("keyboardShortcuts");
    const overlay = document.querySelector(".keyboard-shortcuts-overlay");

    shortcuts.classList.remove("active");
    overlay.remove();
  }
});

// Shortcut untuk membuka hints (Ctrl + /)
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "/") {
    event.preventDefault();
    document.getElementById("showHints").click();
  }
});

// Fokuskan input saat halaman dimuat
window.addEventListener("load", () => {
  display.focus();
});

// Tambahkan event listener untuk mencegah scroll saat input angka
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
});

// Menginisialisasi tema
document.addEventListener("DOMContentLoaded", () => {
  currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);

  // Tampilkan tanda air
  const watermark = document.querySelector(".watermark");
  if (watermark) {
    watermark.textContent = `© ${new Date().getFullYear()} Nur Dwi Priyambodo. Hak Cipta Dilindungi.`;
  }
});
