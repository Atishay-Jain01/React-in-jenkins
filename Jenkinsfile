pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // Use the NodeJS tool installer
    }
    
    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP = 'rg-azure-060425'
        APP_SERVICE_NAME = 'as-react-060425'   // Change this to your desired app service name
        // AZURE_CLI_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'
        // SYSTEM_PATH = 'C:\\Windows\\System32'
        // TERRAFORM_PATH = 'C:\\Users\\DELL\\Downloads\\terraform_1.11.3_windows_386'
    }

    stages {
        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    // set PATH=%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%
                    echo %SYSTEM_PATH%
                    bat '''
                        echo %SYSTEM_PATH%
                        terraform init
                    '''
                }
            }
        }

        stage('Terraform Plan & Apply') {
            steps {
                dir('terraform') {
                    // set PATH=%AZURE_CLI_PATH%;%SYSTEM_PATH%;%TERRAFORM_PATH%;%PATH%
                    bat '''
                        terraform plan
                        terraform apply -auto-approve
                    '''
                }
            }
        }

        stage('Build React Application') {
            steps {
                dir('react-jekins') {
                    bat 'npm install'  
                    bat 'npm run build'
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
