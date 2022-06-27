import {createClient} from "redis";

const redisClient = createClient({
  url: "redis://default:hJ0hld4FyloSQk5Z81RymRZyqKzai8JK@redis-19308.c300.eu-central-1-1.ec2.cloud.redislabs.com:19308",
});

redisClient.on("error", function (err) {
  console.log("*Redis Client Error: " + err.message);
});
redisClient.on("connect", function () {
  console.log("Connected to redis instance");
});
redisClient.connect().catch(err => {
  console.log("Redis connect error: " + err.message);
});

export default redisClient;
