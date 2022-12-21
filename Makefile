include .env

.PHONY: test

test:
	(sudo docker-compose -f test.docker-compose.yaml up --build -d && \
	sudo chmod +x ./tests/utils/db_script_test.sh ./tests/utils/wait-for-it-test.sh && \
	(./tests/utils/wait-for-it-test.sh dbtest:5432 -- true && echo "\033[92mInserting data to database... \033[0m" && \
	./tests/utils/db_script_test.sh drop && ./tests/utils/db_script_test.sh create && ./tests/utils/db_script_test.sh populate);\
	echo "\033[96mRunning Tests...\033[0m" && \
	sudo docker-compose -f test.docker-compose.yaml exec -T user-service-test npm run test);\
	sudo docker-compose -f test.docker-compose.yaml down

test-debug:
	(sudo docker-compose -f test.docker-compose.yaml up --build -d && \
	sudo chmod +x ./tests/utils/db_script_test.sh ./tests/utils/wait-for-it-test.sh && \
	(./tests/utils/wait-for-it-test.sh dbtest:5432 -- true && echo "\033[92mInserting data to database... \033[0m" && \
	./tests/utils/db_script_test.sh drop && ./tests/utils/db_script_test.sh create && ./tests/utils/db_script_test.sh populate);\
	echo "\033[96mRunning Tests...\033[0m" && \
	sudo docker-compose -f test.docker-compose.yaml exec -T user-service-test npm run test-debug);\
	sudo docker-compose -f test.docker-compose.yaml down

up-build:
	chmod +x ../${USER_PATH}/wait-for-it.sh && \
	sudo docker-compose -f docker-compose.yaml up --build