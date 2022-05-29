You can use [jq](https://stedolan.github.io/jq/) to get all pronoun keys:

    cat src/mock-data/get-pronouns.json| jq '.[].name'