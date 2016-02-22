function Colisor(){
	this.sprites = [];
	this.e = 1;
	this.energia = 0;
	this.mostraEnergia = null;
	this.colidiu = false;
}
Colisor.prototype = {
	novoSprite: function(sprite){
		this.sprites.push(sprite);
	},
	removerSprite: function(sprite){
		this.sprites.splice(this.sprites.indexOf(sprite), 1)
	},
	processar: function(){
		var jaTestados = new Object();
		this.colidiu = false;

		for (var i in this.sprites){
			for (var j in this.sprites){
				if (i == j) continue;

				var id1 = this.sprites[i].id;
				var id2 = this.sprites[j].id;

				if (!jaTestados[id1]) jaTestados[id1] = [];
				if (!jaTestados[id2]) jaTestados[id2] = [];

				if (! (jaTestados[id1].indexOf(id2) >= 0 ||
						jaTestados[id2].indexOf(id1) >= 0)){

					this.testarColisao(
						this.sprites[i],
						this.sprites[j]
					);
				}

				jaTestados[id1].push(id2);
				jaTestados[id2].push(id1);
			}
		}
		this.calcularEnergia();
	},
	testarColisao: function(sprite1, sprite2){
		var rets1 = sprite1.retangulosColisao();
		var rets2 = sprite2.retangulosColisao();

		colisoes:
		for (var i in rets1){
			for (var j in rets2){
				//if (this.retangulosColidem(rets1[i],rets2[j])){
				if (this.circulosColidem(sprite1, sprite2)) {
					sprite1.colidiuCom(sprite2);
					sprite2.colidiuCom(sprite1);
					this.colidiu = true;

					this.aoColidir(sprite1, sprite2);

					break colisoes;
				}
			}
		}
	},
	retangulosColidem: function(ret1, ret2){
		return (ret1.x + ret1.largura) > ret2.x &&
				ret1.x < (ret2.x + ret2.largura) &&
				(ret1.y + ret1.altura) > ret2.y &&
				ret1.y < (ret2.y + ret2.altura);
	},
	circulosColidem: function(s1, s2){
		var d = Math.sqrt( Math.pow(s1.x - s2.x, 2) + Math.pow(s1.y - s2.y, 2) );
		
		return (d <= s1.raio + s2.raio);
	},
	aoColidir: function(s1, s2){
		//var v1xf = (s1.velX * (s1.massa - s2.massa) + s2.massa * s2.velX * 2 ) / (s1.massa + s2.massa);
		//var v2xf = s1.velX - s2.velX + v1xf;
		var v1xf = ( s1.massa * s1.velX + s2.massa * s2.velX + s2.massa * this.e * (s2.velX - s1.velX) ) / (s1.massa + s2.massa);
		var v2xf = v1xf + this.e * (s1.velX - s2.velX);

		//var v1yf = (s1.velY * (s1.massa - s2.massa) + s2.massa * s2.velY * 2 ) / (s1.massa + s2.massa);
		//var v2yf = s1.velY - s2.velY + v1yf;
		var v1yf = ( s1.massa * s1.velY + s2.massa * s2.velY + s2.massa * this.e * (s2.velY - s1.velY) ) / (s1.massa + s2.massa);
		var v2yf = v1yf + this.e * (s1.velY - s2.velY);

		s1.velX = v1xf;
		s2.velX = v2xf;
		s1.velY = v1yf;
		s2.velY = v2yf;
	},
	calcularEnergia: function(){
		this.energia = 0;
		for (var i in this.sprites){
			var s = this.sprites[i];
			var v = Math.sqrt(Math.pow(s.velX,2) + Math.pow(s.velY,2),2);
			var e1 = s.massa * Math.pow(v,2) / 2;
			this.energia += e1;
		}
	}
}