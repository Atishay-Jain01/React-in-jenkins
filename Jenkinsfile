pipeline {
    agent any
    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP = 'rg-azure-060425'
        APP_SERVICE_NAME = 'as-react-060425'  // Change this to your desired app service name
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: ''  // Change to your repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    bat "az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID"
                    bat "powershell Compress-Archive -Path ./build/* -DestinationPath ./build.zip -Force"
                    bat "az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_SERVICE_NAME --src-path ./build.zip --type zip"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed!'
        }
    }
}
