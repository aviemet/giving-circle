# frozen_string_literal: true

Rails.application.config.after_initialize do
  spec = Gem.loaded_specs["devise_invitable"]
  next unless spec

  broken_path = File.expand_path("config/locales/pt-BR.yml", spec.full_gem_path)
  next unless File.file?(broken_path)

  I18n.load_path.reject! { |path| File.expand_path(path.to_s) == broken_path }

  require "yaml"
  broken = YAML.safe_load_file(broken_path, aliases: true)
  next unless broken.is_a?(Hash) && broken.key?("pt_BR")

  corrected_dir = Rails.root.join("tmp/i18n")
  FileUtils.mkdir_p(corrected_dir)
  corrected_path = corrected_dir.join("devise_invitable.pt-BR.yml")
  File.write(corrected_path, YAML.dump({ "pt-BR" => broken["pt_BR"] }))

  corrected_expanded = corrected_path.to_s
  unless I18n.load_path.any? { |path| File.expand_path(path.to_s) == corrected_expanded }
    I18n.load_path << corrected_expanded
  end

  I18n.reload!
end
