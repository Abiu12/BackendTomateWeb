FROM node:18.17.0

# Crea el directorio de la aplicación
RUN mkdir -p /home/app

# Copia los archivos de la aplicación al directorio
COPY . /home/app

# Otorga permisos de ejecución al script de inicio
RUN chmod +x /home/app/start.sh

# Expone el puerto 3000
EXPOSE 3000

# Comando de inicio de la aplicación
CMD ["/home/app/start.sh"]
