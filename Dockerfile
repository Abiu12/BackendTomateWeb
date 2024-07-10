# Usa una imagen base adecuada (ejemplo: Ubuntu)
FROM node:18.17.0

# Actualiza los repositorios y instala las dependencias necesarias
RUN apt-get update && \
    apt-get install -y \
    curl \
    gnupg \
    && apt-get clean


RUN mkdir -p /home/app

COPY . /home/app

RUN chmod +x /home/app/start.sh

EXPOSE 3000

CMD ["/home/app/start.sh"]
