
FROM node:19      			
WORKDIR /app      			
COPY ./package*.json ./  		
RUN npm install				
COPY . .				
COPY . /app 	
EXPOSE 8000	
CMD [ "node", "index.js"]
