pipeline {
    agent any

    environment {

    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/yourusername/react-azure-deploy.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('my-react-app') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('my-react-app') {
                    bat 'npm run build'
                }
            }
        }

        stage('Terraform Init') {
            steps {
                dir('infra') {
                    bat 'terraform init'
                }
            }
        }

        stage('Terraform Apply') {
            steps {
                dir('infra') {
                    bat 'terraform apply -auto-approve'
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                dir('my-react-app') {
                    script {
                        def appName = "my-react-app-service"
                        def rgName = "react-rg"
                        bat "az webapp deploy --resource-group ${rgName} --name ${appName} --src-path build --type static"
                    }
                }
            }
        }
    }
}
