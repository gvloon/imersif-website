until mongo --host mongo -u strapi -p strapi --authenticationDatabase admin --eval "print(\"waited for connection\")"
do
    sleep 1
done