/**
 * 
 * http://usejsdoc.org/
 */


exports.list = function(req,res){
	req.getConnection(function(err,connexion){
		var query = connexion.query('SELECT * FROM Produit',function(rows){
			if (err) throw err;
			res.render('produit',{page_title: 'Produit',data:rows});
		});
	});
};

exports.add = function(req,res){
	req.getConnection(function(err,connexion){
		var query= connexion.query("SELECT * FROM Produit",function(err,rows){
			if (err) throw err;
			res.render('add_produit', {
				page_title : 'Ajout d\'un produit',
				data:rows
			});
		});
	});
}

exports.save = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connexion){
		var data = {
			nomProduit : input.nomProduit,
			codeProduit : input.codeProduit,
			descriptionProduit : descriptionProduit,
			tarifProduit : tarifProduit,
			poidsProduit : poidsProduit,
		};
		var query = connexion.query('INSERT INTO Produit SET ?',data,function(err,rows){
			if (err) throw err;
			res.redirect('/produit');
		});
	});
};

exports.edit = function (req,res){
	var id = req.params.id;
	res.getConnection(function(err, connexion){
		var query = connexion.query('SELECT * FROM Produit WHERE idProduit = ?',[id],function(err,rows){
			if (err) throw err;
			res.render('edit_produit',{page_title:'Modification des données du produit',data:rows});
		});
		
	});
};

exports.save_edit = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err, connexion){
		var data = {
				nomProduit : input.nomProduit,
				codeProduit : input.codeProduit,
				descriptionProduit : descriptionProduit,
				tarifProduit : tarifProduit,
				poidsProduit : poidsProduit,	
		};
		var query = connexion.query('UPDATE Produit SET ? WHERE idProduit = ?',[data,id],function(err,rows){
			if (err) throw err;
			res.redirect('/produit');
		});
	});
}

exports.delete_save = function(req,res){
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var query = connexion.query('DELETE FROM Produit WHERE idProduit = ?',[id],function(err,rows){
			if(err) throw err;
			res.redirect('/produit');
		});
	});
}