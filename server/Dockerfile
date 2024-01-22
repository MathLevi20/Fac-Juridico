# Use the official Node image as the base image
FROM node:20-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Exponha a porta 5000 para o servidor de desenvolvimento do React
EXPOSE 5000

# Comando para iniciar o aplicativo quando o contêiner for iniciado
CMD ["node", "/app/db/populateDatabase.js"]

CMD ["npm", "start"]

