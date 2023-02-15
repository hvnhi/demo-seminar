var express = require('express');
var app = express();
app.use(express.static(__dirname+'/public'));

app.get('/', function (req, res) {
    res.send(`
    <div class="scene">
        <div class="cube-wrapper">
            <a href="#">
            <div class="cube">
            <div class="cube-faces">
                <div class="cube-face shadow"></div>
                <div class="cube-face bottom"></div>
                <div class="cube-face top"></div>
                <div class="cube-face left"></div>
                <div class="cube-face right"></div>
                <div class="cube-face back"></div>
                <div class="cube-face front"></div>
            </div>
            </div>
            </a>
        </div>
    </div>
    <div style="font-size: 36px; font-weight: bold">Welcome to Jenkins seminar!!!</div>
    <ol style="font-size: 24px">
        <li>Giới thiệu mô hình</li>
        <li>Jenkins và Syntax</li>
        <li>Deploy với Kubernetes</li>
        <li>Demo</li>
    </ol>
    <img src="images/mo_hinh.png" height="480"/>
    <style>
        * {
            font-family: "Albert Sans", sans-serif;
            font-size: inherit;
        }
        
        body {
            display: flex;
            flex-flow: column;
            place-items: center;
            position: relative;
        }
        
        .scene {
            position: relative;
            z-index: 2;
            height: 220px;
            width: 220px;
            display: grid;
            place-items: center;
        }
        
        .cube-wrapper {
            transform-style: preserve-3d;
            animation: bouncing 2s infinite;
        }
        
        .cube {
            transform-style: preserve-3d;
            transform: rotateX(45deg) rotateZ(45deg);
            animation: rotation 2s infinite;
        }
        
        .cube-faces {
            transform-style: preserve-3d;
            height: 80px;
            width: 80px;
            position: relative;
            transform-origin: 0 0;
            transform: translateX(0) translateY(0) translateZ(-40px);
        }
        
        .cube-face {
            position: absolute;
            inset: 0;
            background: #110d31ff;
            border: solid 1px #ff8484ff;
        }
        .cube-face.shadow {
            transform: translateZ(-80px);
            animation: bouncing-shadow 2s infinite;
        }
        .cube-face.top {
            transform: translateZ(80px);
        }
        .cube-face.front {
            transform-origin: 0 50%;
            transform: rotateY(-90deg);
        }
        .cube-face.back {
            transform-origin: 0 50%;
            transform: rotateY(-90deg) translateZ(-80px);
        }
        .cube-face.right {
            transform-origin: 50% 0;
            transform: rotateX(-90deg) translateY(-80px);
        }
        .cube-face.left {
            transform-origin: 50% 0;
            transform: rotateX(-90deg) translateY(-80px) translateZ(80px);
        }
        
        @keyframes rotation {
            0% {
            transform: rotateX(45deg) rotateY(0) rotateZ(45deg);
            animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
            }
            50% {
            transform: rotateX(45deg) rotateY(0) rotateZ(225deg);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            }
            100% {
            transform: rotateX(45deg) rotateY(0) rotateZ(405deg);
            animation-timing-function: cubic-bezier(0.17, 0.84, 0.44, 1);
            }
        }
        @keyframes bouncing {
            0% {
            transform: translateY(-40px);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            }
            45% {
            transform: translateY(40px);
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
            }
            100% {
            transform: translateY(-40px);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            }
        }
        @keyframes bouncing-shadow {
            0% {
            transform: translateZ(-80px) scale(1.3);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            opacity: 0.05;
            }
            45% {
            transform: translateZ(0);
            animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
            opacity: 0.3;
            }
            100% {
            transform: translateZ(-80px) scale(1.3);
            animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
            opacity: 0.05;
            }
        }
        </style>
    `);
});

app.listen(process.env.PORT || 5000);
module.exports = app;
