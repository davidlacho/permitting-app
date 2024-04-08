.PHONY: install-backend install-frontend start-backend start-frontend start

install-backend:
	cd permit-backend && npm install

install-frontend:
	cd permit-frontend && npm install

start-backend:
	cd permit-backend && npm start &

start-frontend:
	cd permit-frontend && npm start &

start: install-backend install-frontend start-backend start-frontend
	@echo "Backend and frontend are starting..."

