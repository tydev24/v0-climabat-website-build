#!/bin/bash

# Script de déploiement automatique pour Climabat
echo "🚀 Démarrage du build pour hébergement Apache..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Build du projet
echo "🔨 Build du projet Next.js..."
npm run build

# Vérifier que le build s'est bien passé
if [ $? -eq 0 ]; then
    echo "✅ Build terminé avec succès!"
    echo "📁 Les fichiers sont prêts dans le dossier 'out/'"
    echo ""
    echo "📋 Prochaines étapes:"
    echo "1. Uploader tout le contenu du dossier 'out/' sur votre hébergement"
    echo "2. Configurer Formspree pour les formulaires (voir DEPLOYMENT.md)"
    echo "3. Tester le site sur www.climabat34.fr"
    echo ""
    echo "📖 Consultez DEPLOYMENT.md pour plus de détails"
else
    echo "❌ Erreur lors du build"
    exit 1
fi
