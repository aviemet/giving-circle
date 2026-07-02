shared_examples "contact_method" do
  it { is_expected.to belong_to(:contact).required }
  it { is_expected.to belong_to(:category).without_validating_presence }
end
