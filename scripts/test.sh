while [[ "$#" -gt 0 ]]; do
    case $1 in
        -i|--import) IMPORT=1 ;;
    esac
    shift
done

if [ "$IMPORT" == 1 ]
then
  echo "IMPORT"
fi