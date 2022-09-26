run:
	npm run-script start
deploy:
	npm run-script build:stage
	firebase deploy -P staging --only hosting

deployproduct:
	npm run-script build:prod
	firebase deploy -P product --only hosting

preview:
	$(eval CHANNEL=new-awesome-feature)
	npm run-script build:stage
	firebase hosting:channel:deploy ${CHANNEL} --expires 7d -P staging
