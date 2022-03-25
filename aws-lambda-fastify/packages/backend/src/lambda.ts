import awsLambdaFastify from "aws-lambda-fastify";
import fastify from "./index";

const proxy = awsLambdaFastify(fastify);

exports.handler = proxy;
