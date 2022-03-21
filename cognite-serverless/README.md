ref:
https://www.luminis.eu/blog/creating-your-serverless-web-application-using-aws-cdk-part-1/
https://bobbyhadz.com/blog/aws-cdk-cognito-user-pool-example

## Cognito test

- session 取得
  aws cognito-idp admin-initiate-auth \
   --user-pool-id 'User Pool Id' \
   --client-id 'App Client Id' \
   --auth-flow "ADMIN_USER_PASSWORD_AUTH" \
   --auth-parameters USERNAME='user name',PASSWORD='password' \
   --region ap-northeast-1

- password 更新して access token 取得
  aws cognito-idp admin-respond-to-auth-challenge \
  --user-pool-id 'User Pool Id' \
  --client-id 'App Client Id' \
  --challenge-name NEW_PASSWORD_REQUIRED \
  --challenge-responses NEW_PASSWORD='new password',USERNAME='use name',userAttributes.email='use name' \
  --session "↑ で取得した session"

- GET リクエスト
  GET http://api-endpoint/todos
  Authorization: 取得した accessToken
