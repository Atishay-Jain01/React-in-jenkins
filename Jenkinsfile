pipeline {
    agent any

    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP = 'rg-azure-060425'
        APP_SERVICE_NAME = 'as-react-060425'   // Change this to your desired app service name
        AZURE_CLI_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'
        SYSTEM_PATH = 'C:\\Windows\\System32'
        TERRAFORM_PATH = 'C:\\Users\\DELL\\Downloads\\terraform_1.11.3_windows_386'
        REACT_APP_DIR = 'react-jekins/build'  // Define your React app directory here
    }

    stages {
        stage('Test PowerShell Availability') {
            steps {
                powershell 'Write-Host "Testing PowerShell availability"'
            }
        }

        stage('Terraform Init') {
            steps {
                dir('terraform') {
                    // Use PowerShell to run Terraform
                    powershell """
                        $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'
                        terraform init
                    """
                }
            }
        }

        stage('Terraform Plan & Apply') {
            steps {
                dir('terraform') {
                    // Use PowerShell to run Terraform Plan and Apply
                    powershell """
                        $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'
                        terraform plan
                    """
                    powershell """
                        $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'
                        terraform apply -auto-approve
                    """
                }
            }
        }

        stage('Build React Application') {
            steps {
                dir('react-jekins') {
                    // Use PowerShell for npm commands
                    powershell 'npm install'
                    powershell 'npm run build'
                    powershell 'Compress-Archive -Path "build\\*" -DestinationPath "ReactApp.zip" -Force'
                }
            }
        }

        stage('Deploy to Azure App Service') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    // Use PowerShell to deploy to Azure
                    powershell """
                        $env:PATH = '$AZURE_CLI_PATH;$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'
                        az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_SERVICE_NAME --src-path $WORKSPACE\\$REACT_APP_DIR\\ReactApp.zip --type zip
                    """
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
