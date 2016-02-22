
function Animacao(context, colisor){
	this.sprites = [];
	this.ligado = false;
	this.context = context;
	this.colisor = colisor;
	this.intervalo = 1000;
}

Animacao.prototype = {
	novoSprite: function(sprite){
		this.sprites.push(sprite);
		this.colisor.novoSprite(sprite);

		console.table(this.colisor.sprites)
	},
	removerSprite: function(sprite){
		this.sprites.splice(this.sprites.indexOf(sprite), 1)
		this.colisor.removerSprite(sprite);
	},

	ligar: function(){
		this.ligado = true;
		this.proximoFrame();
	},

	desligar: function(){
		this.ligado = false;
	},

	proximoFrame: function(){
		if (!this.ligado) return;

		var agora = new Date().getTime();

		if (!this.ultimoTempo) this.ultimoTempo = agora;
		if (!this.qntBolas) this.qntBolas = 0;

		if (this.intervalo < agora - this.ultimoTempo && this.qntBolas < 5){
			this.ultimoTempo = agora;
			var b = new Bola(this.context);
			b.id = this.qntBolas;
			this.novoSprite(b);
			this.qntBolas++;
		}

		this.limparTela();

		this.colisor.processar();

		for (var i in this.sprites){
			this.sprites[i].atualizar();
		}

		for (var i in this.sprites){
			this.sprites[i].desenhar();
		}

		if (this.colisor.colidiu){
			//console.log('ENERGIA: ' + this.colisor.energia)
		}
		
		var animacao = this;

		requestAnimationFrame(function(){
			animacao.proximoFrame();
		})
	},

	limparTela: function(){
		var ctx = this.context;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	},
}