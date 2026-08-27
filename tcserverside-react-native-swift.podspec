require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name = "tcserverside-react-native-swift"
  s.version = package["version"]
  s.summary = "Deprecated: use tcserverside-react-native instead"
  s.description = <<-DESC
                  This pod is deprecated. All functionality is now in tcserverside-react-native.
                   DESC
  s.homepage = "https://github.com/commandersAct/tcserverside-react-native"
  s.license = { :type => "Commercial", :file => "LICENSE" }
  s.authors = { "CommandersAct" => "mobile@commandersact.com" }
  s.platforms = { :ios => "15.1" }
  s.source = { :git => "https://github.com/commandersAct/tcserverside-react-native.git", :tag => package["version"] }
  s.dependency 'tcserverside-react-native'
end