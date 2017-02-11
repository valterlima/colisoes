var cores = ['green', 'red', 'blue', 'black', 'orange', 'gray', 'cyan', 'yellow'];

function Bola(context, ballParams = {}){
	this.velX = ballParams.xVel || randomIntFromInterval(-5,5);
	this.velY = ballParams.yVel || randomIntFromInterval(-5,5);
	this.raio = ballParams.radius || randomIntFromInterval(10,50);
	this.massa = this.raio;
	this.cor = ballParams.color || cores[randomIntFromInterval(1,8)];
	this.x = ballParams.xPos || randomIntFromInterval(this.raio,600-this.raio);
	this.y = ballParams.yPos || randomIntFromInterval(this.raio,400-this.raio);
	this.context = context;
	this.id = 0;
}

Bola.prototype = {
	atualizar: function(){
		var ctx = this.context;
		var e = 1;

		if (this.x < this.raio || this.x > ctx.canvas.width - this.raio)
			this.velX *= -1;

		if (this.y < this.raio || this.y > ctx.canvas.height - this.raio)
			this.velY *= -1;

		this.x += this.velX*e;
		this.y += this.velY*e;

	},
	desenhar: function(){
		var ctx = this.context;
		ctx.save();
		ctx.fillStyle = this.cor;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.raio, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.font = "12px serif";
		ctx.fillText(
			'B: ' + this.id + 
			'- Vx: ' + this.velX.toLocaleString('en-US', {minimumFractionDigits: 2}) + 
			', Vy' + this.velY.toLocaleString('en-US', {minimumFractionDigits: 2}), 
			this.x-50, 
			this.y-this.raio-2)
		ctx.restore();
	},
	retangulosColisao: function(){
		return [
			{
				id: new Date().getTime(),
				x: this.x - this.raio,
				y: this.y - this.raio,
				largura: this.raio * 2,
				altura: this.raio * 2
			}
		]
	},
	colidiuCom: function(sprite){
		/*if (this.raio >= sprite.raio) return;
		if (this.x < sprite.x){
			this.velX = -Math.abs(this.velX);
		}
		else{
			this.velX = Math.abs(this.velX);
		}
		if (this.y < sprite.y){
			this.velY = -Math.abs(this.velY);
		}
		else{
			this.velY = Math.abs(this.velY);
		}
		*/
		
	},
	calcularVel: function(sprite1, sprite2){
		var v1xf = sprite1.velX * (sprite1.massa + sprite2.massa) / (sprite1.massa - sprite2.massa);
		var v2xf = v1xf  - sprite1.velX + sprite2.velX;

		var v1yf = sprite1.velY * (sprite1.massa + sprite2.massa) / (sprite1.massa - sprite2.massa);
		var v2yf = v1yf  - sprite1.velY + sprite2.velY;

		sprite1.velX = v1xf;
		sprite1.velY = v1yf;

		sprite2.velX = v2xf;
		sprite2.velY = v2yf;

	}
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}