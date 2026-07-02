shared_examples "contact_method" do
  it { is_expected.to belong_to(:contact) }
  it { is_expected.to belong_to(:category) }
end
