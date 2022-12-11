---
tags: ["Essay", "AWS"]
date: 2022-12-11T16:00:00+08:00
title: "Cloudfront with Image Optimization"
image: "https://static.juzhiyuan.me/2022/12/11/076aca594d59793a4c4db18493e98835.png?format=webp"
---

This blog is built with Hugo, and served by GitHub Pages.

All static images are uploaded to AWS S3, and served by another domain, https://static.juzhiyuan.me. This CDN domain maps to AWS Cloudfront:

1. Client -> https://static.juzhiyuan.me/xxx?format=webp
2. Cloudfront triggers AWS Lambda Function to convert original images to specified format
3. Transformed images are stored in another S3 Bucket `imgtransformationstack-s3transformedimagebucket6d-fjwwbg2y69cf`

For more information, please check [AWS CDK Sample](https://github.com/aws-samples/image-optimization/commit/98b097013ce4a492fc092e25913cf429c7136736) and AWS CloudFormation.

![](https://static.juzhiyuan.me/2022/12/11/076aca594d59793a4c4db18493e98835.png?format=webp)
