
cmd=$1

case $cmd in
    populate)
        sudo docker cp ./tests/utils/db_populate.sql $(sudo docker-compose -f test.docker-compose.yaml ps -q dbtest):/db_populate.sql
        sudo docker-compose -f test.docker-compose.yaml exec dbtest psql -U pumaadmin -d puma -f /db_populate.sql
    ;;
    clear)
        sudo docker cp ./tests/utils/db_clear.sql $(sudo docker-compose -f test.docker-compose.yaml ps -q dbtest):/db_clear.sql
        sudo docker-compose -f test.docker-compose.yaml exec dbtest psql -U pumaadmin -d puma -f /db_clear.sql
    ;;
    create)
        sudo docker cp ./tests/utils/db_create.sql $(sudo docker-compose -f test.docker-compose.yaml ps -q dbtest):/db_create.sql
        sudo docker-compose -f test.docker-compose.yaml exec dbtest psql -U pumaadmin -d puma -f /db_create.sql
    ;;
    drop)
        sudo docker cp ./tests/utils/db_drop.sql $(sudo docker-compose -f test.docker-compose.yaml ps -q dbtest):/db_drop.sql
        sudo docker-compose -f test.docker-compose.yaml exec dbtest psql -U pumaadmin -d puma -f /db_drop.sql
    ;;
    *)
        echo Wrong option
    ;;
esac
