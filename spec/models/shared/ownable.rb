shared_examples "ownable" do
  describe "Associations" do
    it { is_expected.to have_one(:owner) }
    it { is_expected.to have_one(:circle) }
  end
end
