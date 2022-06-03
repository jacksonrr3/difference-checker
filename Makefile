install:
	npm ci

lint:
	npx eslint .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watchAll

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
