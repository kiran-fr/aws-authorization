"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkStarterStack = void 0;
const apiGateway = __importStar(require("@aws-cdk/aws-apigatewayv2"));
const apiGatewayAuthorizers = __importStar(require("@aws-cdk/aws-apigatewayv2-authorizers"));
const apiGatewayIntegrations = __importStar(require("@aws-cdk/aws-apigatewayv2-integrations"));
const cognito = __importStar(require("@aws-cdk/aws-cognito"));
const lambda = __importStar(require("@aws-cdk/aws-lambda"));
const aws_lambda_nodejs_1 = require("@aws-cdk/aws-lambda-nodejs");
const cdk = __importStar(require("@aws-cdk/core"));
const path = __importStar(require("path"));
class CdkStarterStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const userPool = new cognito.UserPool(this, 'userpool', {
            userPoolName: `my-user-pool`,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            selfSignUpEnabled: true,
            signInAliases: { email: true },
            autoVerify: { email: true },
            passwordPolicy: {
                minLength: 6,
                requireLowercase: false,
                requireDigits: false,
                requireUppercase: false,
                requireSymbols: false,
            },
            accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        });
        const userPoolClient = new cognito.UserPoolClient(this, 'userpool-client', {
            userPool,
            authFlows: {
                adminUserPassword: true,
                userPassword: true,
                custom: true,
                userSrp: true,
            },
            supportedIdentityProviders: [
                cognito.UserPoolClientIdentityProvider.COGNITO,
            ],
        });
        const lambdaFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'my-function', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'main',
            entry: path.join(__dirname, `/../src/protected-function/index.ts`),
        });
        const httpApi = new apiGateway.HttpApi(this, 'api', {
            apiName: `my-api`,
        });
        const authorizer = new apiGatewayAuthorizers.HttpUserPoolAuthorizer('user-pool-authorizer', userPool, {
            userPoolClients: [userPoolClient],
            identitySource: ['$request.header.Authorization'],
        });
        httpApi.addRoutes({
            integration: new apiGatewayIntegrations.HttpLambdaIntegration('protected-fn-integration', lambdaFunction),
            path: '/protected',
            authorizer,
        });
        new cdk.CfnOutput(this, 'region', { value: cdk.Stack.of(this).region });
        new cdk.CfnOutput(this, 'userPoolId', { value: userPool.userPoolId });
        new cdk.CfnOutput(this, 'userPoolClientId', {
            value: userPoolClient.userPoolClientId,
        });
        new cdk.CfnOutput(this, 'apiUrl', {
            value: httpApi.url,
        });
    }
}
exports.CdkStarterStack = CdkStarterStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXN0YXJ0ZXItc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjZGstc3RhcnRlci1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQXdEO0FBQ3hELDZGQUErRTtBQUMvRSwrRkFBaUY7QUFDakYsOERBQWdEO0FBQ2hELDREQUE4QztBQUM5QyxrRUFBMEQ7QUFDMUQsbURBQXFDO0FBQ3JDLDJDQUE2QjtBQUU3QixNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDNUMsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBR3hCLE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3RELFlBQVksRUFBRSxjQUFjO1lBQzVCLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU87WUFDeEMsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixhQUFhLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDO1lBQzVCLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUM7WUFDekIsY0FBYyxFQUFFO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2dCQUNaLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixnQkFBZ0IsRUFBRSxLQUFLO2dCQUN2QixjQUFjLEVBQUUsS0FBSzthQUN0QjtZQUNELGVBQWUsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFVBQVU7U0FDcEQsQ0FBQyxDQUFDO1FBR0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN6RSxRQUFRO1lBQ1IsU0FBUyxFQUFFO2dCQUNULGlCQUFpQixFQUFFLElBQUk7Z0JBQ3ZCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsMEJBQTBCLEVBQUU7Z0JBQzFCLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxPQUFPO2FBQy9DO1NBQ0YsQ0FBQyxDQUFDO1FBR0gsTUFBTSxjQUFjLEdBQUcsSUFBSSxrQ0FBYyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDN0QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxxQ0FBcUMsQ0FBQztTQUNuRSxDQUFDLENBQUM7UUFHSCxNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUNsRCxPQUFPLEVBQUUsUUFBUTtTQUNsQixDQUFDLENBQUM7UUFHSCxNQUFNLFVBQVUsR0FBRyxJQUFJLHFCQUFxQixDQUFDLHNCQUFzQixDQUNqRSxzQkFBc0IsRUFDdEIsUUFBUSxFQUNSO1lBQ0UsZUFBZSxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQ2pDLGNBQWMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQ2xELENBQ0YsQ0FBQztRQUdGLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDaEIsV0FBVyxFQUFFLElBQUksc0JBQXNCLENBQUMscUJBQXFCLENBQzNELDBCQUEwQixFQUMxQixjQUFjLENBQ2Y7WUFDRCxJQUFJLEVBQUUsWUFBWTtZQUNsQixVQUFVO1NBQ1gsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUN0RSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztRQUNwRSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzFDLEtBQUssRUFBRSxjQUFjLENBQUMsZ0JBQWdCO1NBQ3ZDLENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBRWhDLEtBQUssRUFBRSxPQUFPLENBQUMsR0FBSTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE3RUQsMENBNkVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYXBpR2F0ZXdheSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyJztcclxuaW1wb3J0ICogYXMgYXBpR2F0ZXdheUF1dGhvcml6ZXJzIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItYXV0aG9yaXplcnMnO1xyXG5pbXBvcnQgKiBhcyBhcGlHYXRld2F5SW50ZWdyYXRpb25zIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItaW50ZWdyYXRpb25zJztcclxuaW1wb3J0ICogYXMgY29nbml0byBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0byc7XHJcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcclxuaW1wb3J0IHtOb2RlanNGdW5jdGlvbn0gZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYS1ub2RlanMnO1xyXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2RrU3RhcnRlclN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgLy8g8J+RhyBjcmVhdGUgdGhlIHVzZXIgcG9vbFxyXG4gICAgY29uc3QgdXNlclBvb2wgPSBuZXcgY29nbml0by5Vc2VyUG9vbCh0aGlzLCAndXNlcnBvb2wnLCB7XHJcbiAgICAgIHVzZXJQb29sTmFtZTogYG15LXVzZXItcG9vbGAsXHJcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXHJcbiAgICAgIHNlbGZTaWduVXBFbmFibGVkOiB0cnVlLFxyXG4gICAgICBzaWduSW5BbGlhc2VzOiB7ZW1haWw6IHRydWV9LFxyXG4gICAgICBhdXRvVmVyaWZ5OiB7ZW1haWw6IHRydWV9LFxyXG4gICAgICBwYXNzd29yZFBvbGljeToge1xyXG4gICAgICAgIG1pbkxlbmd0aDogNixcclxuICAgICAgICByZXF1aXJlTG93ZXJjYXNlOiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlRGlnaXRzOiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlVXBwZXJjYXNlOiBmYWxzZSxcclxuICAgICAgICByZXF1aXJlU3ltYm9sczogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICAgIGFjY291bnRSZWNvdmVyeTogY29nbml0by5BY2NvdW50UmVjb3ZlcnkuRU1BSUxfT05MWSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIPCfkYcgY3JlYXRlIHRoZSB1c2VyIHBvb2wgY2xpZW50XHJcbiAgICBjb25zdCB1c2VyUG9vbENsaWVudCA9IG5ldyBjb2duaXRvLlVzZXJQb29sQ2xpZW50KHRoaXMsICd1c2VycG9vbC1jbGllbnQnLCB7XHJcbiAgICAgIHVzZXJQb29sLFxyXG4gICAgICBhdXRoRmxvd3M6IHtcclxuICAgICAgICBhZG1pblVzZXJQYXNzd29yZDogdHJ1ZSxcclxuICAgICAgICB1c2VyUGFzc3dvcmQ6IHRydWUsXHJcbiAgICAgICAgY3VzdG9tOiB0cnVlLFxyXG4gICAgICAgIHVzZXJTcnA6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1cHBvcnRlZElkZW50aXR5UHJvdmlkZXJzOiBbXHJcbiAgICAgICAgY29nbml0by5Vc2VyUG9vbENsaWVudElkZW50aXR5UHJvdmlkZXIuQ09HTklUTyxcclxuICAgICAgXSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIPCfkYcgY3JlYXRlIHRoZSBsYW1iZGEgdGhhdCBzaXRzIGJlaGluZCB0aGUgYXV0aG9yaXplclxyXG4gICAgY29uc3QgbGFtYmRhRnVuY3Rpb24gPSBuZXcgTm9kZWpzRnVuY3Rpb24odGhpcywgJ215LWZ1bmN0aW9uJywge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcclxuICAgICAgaGFuZGxlcjogJ21haW4nLFxyXG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgYC8uLi9zcmMvcHJvdGVjdGVkLWZ1bmN0aW9uL2luZGV4LnRzYCksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDwn5GHIGNyZWF0ZSB0aGUgQVBJXHJcbiAgICBjb25zdCBodHRwQXBpID0gbmV3IGFwaUdhdGV3YXkuSHR0cEFwaSh0aGlzLCAnYXBpJywge1xyXG4gICAgICBhcGlOYW1lOiBgbXktYXBpYCxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIPCfkYcgY3JlYXRlIHRoZSBBdXRob3JpemVyXHJcbiAgICBjb25zdCBhdXRob3JpemVyID0gbmV3IGFwaUdhdGV3YXlBdXRob3JpemVycy5IdHRwVXNlclBvb2xBdXRob3JpemVyKFxyXG4gICAgICAndXNlci1wb29sLWF1dGhvcml6ZXInLFxyXG4gICAgICB1c2VyUG9vbCxcclxuICAgICAge1xyXG4gICAgICAgIHVzZXJQb29sQ2xpZW50czogW3VzZXJQb29sQ2xpZW50XSxcclxuICAgICAgICBpZGVudGl0eVNvdXJjZTogWyckcmVxdWVzdC5oZWFkZXIuQXV0aG9yaXphdGlvbiddLFxyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyDwn5GHIHNldCB0aGUgQXV0aG9yaXplciBvbiB0aGUgUm91dGVcclxuICAgIGh0dHBBcGkuYWRkUm91dGVzKHtcclxuICAgICAgaW50ZWdyYXRpb246IG5ldyBhcGlHYXRld2F5SW50ZWdyYXRpb25zLkh0dHBMYW1iZGFJbnRlZ3JhdGlvbihcclxuICAgICAgICAncHJvdGVjdGVkLWZuLWludGVncmF0aW9uJyxcclxuICAgICAgICBsYW1iZGFGdW5jdGlvbixcclxuICAgICAgKSxcclxuICAgICAgcGF0aDogJy9wcm90ZWN0ZWQnLFxyXG4gICAgICBhdXRob3JpemVyLFxyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ3JlZ2lvbicsIHt2YWx1ZTogY2RrLlN0YWNrLm9mKHRoaXMpLnJlZ2lvbn0pO1xyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ3VzZXJQb29sSWQnLCB7dmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWR9KTtcclxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICd1c2VyUG9vbENsaWVudElkJywge1xyXG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcclxuICAgIH0pO1xyXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ2FwaVVybCcsIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cclxuICAgICAgdmFsdWU6IGh0dHBBcGkudXJsISxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=