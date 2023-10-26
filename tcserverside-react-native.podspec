require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name = "tcserverside-react-native"
  s.version = package["version"]
  s.summary = package["description"]
  s.description = <<-DESC
                  Commanders Act React Native Bridge
                   DESC
  s.homepage = "https://github.com/commandersAct/tcserverside-react-native"
  s.license = { :type => "Commercial", :file => "LICENSE" }
  s.authors = { "CommandersAct" => "mobile@commandersact.com" }
  s.platforms = { :ios => "11.0" }
  s.source = { :git => "https://github.com/commandersAct/tcserverside-react-native.git", :tag => package["version"] }
  s.source_files = "ios/**/*.{h,c,m,mm}"
  s.requires_arc = true
  s.swift_version = "5.0"
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }

  s.dependency 'React-Core'
  s.dependency 'IOSV5-TCCore', '5.3.1'
  s.dependency 'TCServerSide_noIDFA', '5.4.1'

end

