# contentful config
ACCESS_TOKEN=gpQrL1UvQm5742RNejqIyHfDcLmWoMv8bRALAoWhI0s
SPACE_ID=oj23j4uzkkrx

NEW_ENVIRONMENT=20210602_Quiz_add
OLD_ENVIRONMENT=master

MODELS="
productDetailCollection
answerCollection
brandDescriptionCollection
brandDetailCollection
quizCollection
productDescriptionTable
productTag
"

# utility function to get json from contentful via graphql
fetch_contentful() {
	# graphql query and environment are arguments
	gql=$1
	env=$2

	# make json payload
	json_payload=`jq -n \
		--arg q "$gql" \
		'{query: $q}'`

	# fetch from contentful
	curl -s -o - \
		-H 'Content-Type: application/json' \
		-H "Authorization: Bearer $ACCESS_TOKEN" \
		-d "$json_payload" \
		"https://graphql.contentful.com/content/v1/spaces/$SPACE_ID/environments/$env"

}

# main
for model in $MODELS
do
	echo target is $model

	# dinamically change model
	# by overwriting __MODEL_COLLECTION__ written in query
	query=$(cat ./query/getSystemFields.gql | sed -s "s/__MODEL_COLLECTION__/$model/g")

	echo "  fetching $OLD_ENVIRONMENT"
	fetch_contentful "$query" $OLD_ENVIRONMENT | jq . > ./old_contents/$model.json
	echo "  fetching $NEW_ENVIRONMENT"
	fetch_contentful "$query" $NEW_ENVIRONMENT | jq . > ./new_contents/$model.json
done

