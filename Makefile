include .env

.PHONY: test

test:
	(sudo docker-compose -f test.docker-compose.yaml up --build -d && \
	sudo chmod +x ./tests/utils/db_script_test.sh ./tests/utils/wait-for-it-test.sh ./tests/utils/init-cmd-test.sh && \
	(./tests/utils/wait-for-it-test.sh db-test:5432 -- ./tests/utils/db_script_test.sh && \
	echo "\033[92mInserting data to database... \033[0m");\
	echo "\033[96mRunning Tests...\033[0m" && \
	sudo docker-compose -f test.docker-compose.yaml exec user-service-test npm run unitary-test) && \
	echo "\033[96mGenerating test results...\033[0m" && \
	sudo docker cp user-service-test:/app/test-results.xml . &&\
	sudo docker cp user-service-test:/app/coverage/cobertura-coverage.xml . &&\
	sudo docker-compose -f test.docker-compose.yaml down