/**
 * http://usejsdoc.org/
 */

exports.list = function(req,res){
	req.getConnection(function(err,connexion){
		var query = connnexion.query('SELECT * FROM Catalogue',function(err,rows){
			if(err)throw err;
			res.render('catalogue',{page_title: 'Catalogue',data:rows});
		});
	});
}

exports.add_produit = function(req,res){
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var data = {
			catalogue : input.idcatalogue,
			produit : input.idcatalogue
		};
		var query = connexion.query('INSERT INTO CatalogueProduit SET ?',data,function(err,rows){
			if (err) throw err;
			res.redirect('/catalogue');
		});
	});
}

/*
exports.save_edit_produit = function(req,res){
	var id = req.params.id;
	var idProduit = req.params.idProduit;
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connexion){
		var data = {
				
		}
		var query = connexion.query();
	});
	
}
*/

exports.delete_produit = function(req,res){
	var id = req.params.id;
	var idProduit = req.params.idProduit;
	req.getConnection(function(err, connexion){
		var query = connexion.query('DELETE FROM CatalogueProduit WHERE catalogue = ? AND produit = ?',[id,idProduit],function(err,rows){
			if(err)throw err;
			res.redirect('/catalogue/:id');
		});
	});
}

exports.delete_save = function(req,res){
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var query = connexion.query('DELETE FROM Catalogue WHERE idCatalogue = ?',[id],function(err,rows){
			if(err) throw err;
			res.redirect('/catalogue');
		});
	});
}