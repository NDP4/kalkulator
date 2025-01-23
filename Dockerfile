# Menggunakan nginx versi ringan sebagai image dasar
FROM nginx:alpine

# Menyalin berkas aplikasi ke direktori web server
COPY . /usr/share/nginx/html/

# Membuka port untuk akses web
EXPOSE 80
