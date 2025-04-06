pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP = 'rg-azure-060425'
        APP_SERVICE_NAME = 'as-react-060425'   // Change this to your desired app service name
        AZURE_CLI_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'
        SYSTEM_PATH = 'C:/Windows/System32'
        TERRAFORM_PATH = 'C:\\Users\\DELL\\Downloads\\terraform_1.11.3_windows_386'
        REACT_APP_DIR = 'react-jekins'  // Directory containing the React application
        NODE_PATH = 'C:\\Program Files\\nodejs' // Add this line for Node.js  
    }

    stages {
        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    bat '''
                        set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%
                        terraform init
                    '''
                }
            }
        }

        stage('Terraform Plan & Apply') {
            steps {
                dir('terraform') {
                    bat '''
                        set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%
                        terraform plan
                        terraform apply -auto-approve
                    '''
                }
            }
        }

        stage('Build React Application') {
            steps {
                dir(REACT_APP_DIR) {
                    withEnv(["PATH=${NODE_PATH};${PATH}"]) {
                        bat 'npm install'  
                        bat 'npm run build'
                    }
                    bat 'powershell Compress-Archive -Path "build\\*" -DestinationPath "ReactApp.zip" -Force'
                }
            }
        }

        stage('Deploy to Azure App Service') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    bat 'set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%'
                    bat 'az webapp deploy --resource-group %RESOURCE_GROUP% --name %APP_SERVICE_NAME% --src-path %WORKSPACE%\\%REACT_APP_DIR%\\ReactApp.zip --type zip'
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
