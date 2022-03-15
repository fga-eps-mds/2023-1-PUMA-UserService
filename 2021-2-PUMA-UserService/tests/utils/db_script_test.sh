sudo docker cp ./tests/utils/populate.sql $(sudo docker-compose -f test.docker-compose.yaml ps -q db-test):/popula.sql
sudo docker-compose -f test.docker-compose.yaml exec -T db-test psql -U pumaadmin -d puma -f /popula.sql
