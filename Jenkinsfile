// pipeline {  
//     agent any  

//     environment {  
//         AZURE_CREDENTIALS_ID = 'azure-service-principal-react'  
//         RESOURCE_GROUP = 'rg-azure-060425'  
//         APP_SERVICE_NAME = 'as-react-060425'  // Change this to your desired app service name  
//         AZURE_CLI_PATH = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin'  
//         SYSTEM_PATH = 'C:\\Windows\\System32'  
//         TERRAFORM_PATH = 'C:\\Users\\DELL\\Downloads\\terraform_1.11.3_windows_386'  
//         REACT_APP_DIR = 'react-jekins/build'  // Define your React app directory here  
//     }  

//     stages {  
//         stage('Test PowerShell Availability') {  
//             steps {  
//                 powershell 'Write-Host "Testing PowerShell availability"'  
//             }  
//         }  

//         stage('Terraform Init') {  
//             steps {  
//                 dir('terraform') {  
//                     // Use PowerShell to run Terraform  
//                     // $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     powershell """  
//                         Start-Sleep -Seconds 2  
//                         Write-Host "Terraform Init in progress..."  
//                     """  
//                 }  
//             }  
//         }  

//         stage('Terraform Plan & Apply') {  
//             steps {  
//                 dir('terraform') {  
//                     // Use PowerShell to run Terraform Plan and Apply  
//                     // $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     powershell """  
//                         Start-Sleep -Seconds 5  
//                         Write-Host "Terraform Plan..."  
//                     """  
//                     // $env:PATH = '$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     // terraform apply -auto-approve  
//                     powershell """  
//                         Start-Sleep -Seconds 10  
//                         Write-Host "Terraform Apply..."  
//                     """  
//                 }  
//             }  
//         }  

//         stage('Build React Application') {  
//             steps {  
//                 dir('react-jekins') {  
//                     // Use PowerShell for npm commands  
//                     powershell """  
//                         Start-Sleep -Seconds 12  
//                         Write-Host "Building React Application..."  
//                         npm install  
//                         npm run build  
//                         Compress-Archive -Path "build\\*" -DestinationPath "ReactApp.zip" -Force  
//                     """  
//                 }  
//             }  
//         }  

//         stage('Deploy to Azure App Service') {  
//             steps {  
//                 withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {  
//                     // Use PowerShell to deploy to Azure  
//                     // $env:PATH = '$AZURE_CLI_PATH;$SYSTEM_PATH;$TERRAFORM_PATH;$env:PATH'  
//                     // az webapp deploy --resource-group $RESOURCE_GROUP --name $APP_SERVICE_NAME --src-path $WORKSPACE\\$REACT_APP_DIR\\ReactApp.zip --type zip  
//                     powershell """  
//                         Start-Sleep -Seconds 2  
//                         Write-Host "Deploying to Azure App Service..."  
//                     """  
//                 }  
//             }  
//         }  
//     }  

//     post {  
//         success {  
//             echo 'Deployment Successful!'  
//         }  
//         failure {  
//             echo 'Deployment Failed!'  
//         }  
//     }  
// }  

// NEW
pipeline {
    agent any
    environment {
        AZURE_CREDENTIALS_ID = 'azure-service-principal-react'
        RESOURCE_GROUP       = 'WebServiceRG'
        APP_SERVICE_NAME     = 'AryanRathoreWebApp0412'
        TF_WORKING_DIR       = '.'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Atishay-Jain01/React-in-jenkins.git'
            }
        }
         stage('Terraform Init') {
            steps {
                withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
                    bat """
                    echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
                    cd %TF_WORKING_DIR%
                    echo "Initializing Terraform..."
                    terraform init
                    """
                }
            }
        }

        stage('Terraform Plan') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            bat """
            echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
            cd %TF_WORKING_DIR%
            terraform plan -out=tfplan
            """
        }
    }
}


        stage('Terraform Apply') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            bat """
            echo "Navigating to Terraform Directory: %TF_WORKING_DIR%"
            cd %TF_WORKING_DIR%
            echo "Applying Terraform Plan..."
            terraform apply -auto-approve tfplan
            """
        }
    }
}

    

        stage('Build') {
    steps {
        bat 'npm install'        // Install dependencies
        bat 'npm run build'      // Build the production-ready React app
    }
}


       stage('Deploy') {
    steps {
        withCredentials([azureServicePrincipal(credentialsId: AZURE_CREDENTIALS_ID)]) {
            bat """
            powershell Compress-Archive -Path build/* -DestinationPath build.zip -Force
            az webapp deploy --resource-group %RESOURCE_GROUP% --name %APP_SERVICE_NAME% --src-path build.zip --type zip

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
