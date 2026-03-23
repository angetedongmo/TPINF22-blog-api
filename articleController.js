const db = require('../models/db');

// Créer un article
exports.createArticle = (req, res) => {
  const { titre, contenu, auteur, date, categorie, tags } = req.body;

  if (!titre || !contenu || !auteur || !date || !categorie) {
    return res.status(400).json({
      message: 'Les champs titre, contenu, auteur, date et categorie sont obligatoires.'
    });
  }

  const tagsString = JSON.stringify(Array.isArray(tags) ? tags : []);

  const sql = `
    INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [titre, contenu, auteur, date, categorie, tagsString], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }

    return res.status(201).json({
      message: 'Article créé avec succès',
      id: this.lastID
    });
  });
};

// Lire tous les articles
exports.getAllArticles = (req, res) => {
  const { categorie, auteur, date } = req.query;

  let sql = 'SELECT * FROM articles WHERE 1=1';
  const params = [];

  if (categorie) {
    sql += ' AND categorie = ?';
    params.push(categorie);
  }

  if (auteur) {
    sql += ' AND auteur = ?';
    params.push(auteur);
  }

  if (date) {
    sql += ' AND date = ?';
    params.push(date);
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }

    const articles = rows.map((article) => ({
      ...article,
      tags: JSON.parse(article.tags || '[]')
    }));

    return res.status(200).json(articles);
  });
};

// Lire un article par ID
exports.getArticleById = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    row.tags = JSON.parse(row.tags || '[]');

    return res.status(200).json(row);
  });
};

// Modifier un article
exports.updateArticle = (req, res) => {
  const { id } = req.params;
  const { titre, contenu, categorie, tags } = req.body;

  db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    const updatedTitre = titre || row.titre;
    const updatedContenu = contenu || row.contenu;
    const updatedCategorie = categorie || row.categorie;
    const updatedTags = tags ? JSON.stringify(tags) : row.tags;

    db.run(
      `UPDATE articles
       SET titre = ?, contenu = ?, categorie = ?, tags = ?
       WHERE id = ?`,
      [updatedTitre, updatedContenu, updatedCategorie, updatedTags, id],
      function (err) {
        if (err) {
          return res.status(500).json({ message: 'Erreur serveur', error: err.message });
        }

        return res.status(200).json({ message: 'Article mis à jour avec succès' });
      }
    );
  });
};

// Supprimer un article
exports.deleteArticle = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM articles WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }

    return res.status(200).json({ message: 'Article supprimé avec succès' });
  });
};

// Rechercher des articles
exports.searchArticles = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Le paramètre query est obligatoire' });
  }

  const sql = `
    SELECT * FROM articles
    WHERE titre LIKE ? OR contenu LIKE ?
  `;

  db.all(sql, [`%${query}%`, `%${query}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }

    const articles = rows.map((article) => ({
      ...article,
      tags: JSON.parse(article.tags || '[]')
    }));

    return res.status(200).json(articles);
  });
};
