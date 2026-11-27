# Collecte pédagogique : aucune modification des configurations du SI.
# Exécuter uniquement sur poste Windows d'administration autorisé.
# Les exports restent locaux et peuvent contenir des informations sensibles.
param([string]$Destination = "$env:USERPROFILE\AuditCyber", [switch]$InclureGPO)
$ErrorActionPreference = 'Stop'
$Out = Join-Path $Destination (Get-Date -Format 'yyyyMMdd-HHmmss')
New-Item -ItemType Directory -Path $Out -Force | Out-Null
$Log = Join-Path $Out 'collecte.log'
function Collecte($Nom, [scriptblock]$Action) {
  try { & $Action; Add-Content $Log "$Nom : OK" }
  catch { Add-Content $Log "$Nom : ECHEC - $($_.Exception.Message)" }
}
Collecte 'Annuaire' {
  Import-Module ActiveDirectory
  Get-ADComputer -Filter * -Properties OperatingSystem,OperatingSystemVersion,LastLogonDate |
    Select-Object Name,OperatingSystem,OperatingSystemVersion,LastLogonDate,Enabled |
    Export-Csv (Join-Path $Out 'Ordinateurs.csv') -NoTypeInformation -Encoding UTF8
}
if ($InclureGPO) {
  Collecte 'GPO' {
    Import-Module GroupPolicy
    Get-GPOReport -All -ReportType Html -Path (Join-Path $Out 'GPO.html')
  }
}
Collecte 'Correctifs locaux uniquement' {
  Get-HotFix | Select-Object HotFixID,InstalledOn |
    Export-Csv (Join-Path $Out 'Correctifs_locaux.csv') -NoTypeInformation -Encoding UTF8
}
Write-Output "Consulter $Out et le journal ; conserver dans un emplacement protégé."