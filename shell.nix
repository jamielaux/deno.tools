let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs {};
in
pkgs.mkShell {
  buildInputs = [
    pkgs.bazelisk
    pkgs.bazel-buildtools
    pkgs.deno
  ];

  shellHook = ''
    alias bazel="bazelisk"
  '';
}
