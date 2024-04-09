.PHONY: install-backend install-frontend start-backend start-frontend start stop

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

stop:
	@-kill $$(lsof -ti:3000) 2>/dev/null
	@-kill $$(lsof -ti:5000) 2>/dev/null
	@echo "Backend and frontend have been stopped."
